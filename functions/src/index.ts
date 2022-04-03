import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const PATH_EGGS = "/competition/{competition}/egg/{egg}";
const PATH_HINTS = "/competition/{competition}/hint/{hint}";

exports.pushEggs = functions.database.ref(PATH_EGGS).onUpdate(
    async (change, context) => {
      functions.logger.info("Egg updated: " + context.params.egg);

      const valAfter = change.after.val();
      const valBefore = change.before.val();

      if (valAfter.timeFound != null && valBefore.timeFound == null) {
        const devices =
          await change.after.ref.parent!.parent!.child("device").get();

        devices.forEach((device) => {
          const message = {
            notification: {
              body: `${valAfter.hunterDescription} just found an egg.`,
              title: "Wuepah! 🎉️",
            },
            token: device.key!,
          };

          admin.messaging().send(message).then((response) => {
            functions.logger.info("Push succeeded");
          }).catch((error) => {
            functions.logger.info("Push failed");
          });
        });
      }
    });

exports.pushHints = functions.database.ref(PATH_HINTS).onCreate(
    async (snapshot, context) => {
      functions.logger.info("Hint created: " + context.params.hint);

      const devices =
        await snapshot.ref.parent!.parent!.child("device").get();

      devices.forEach((device) => {
        const message = {
          notification: {
            body: snapshot.val().text,
            title: "Psst! 🤫️",
          },
          token: device.key!,
        };

        admin.messaging().send(message).then((response) => {
          functions.logger.info("Push succeeded");
        }).catch((error) => {
          functions.logger.info("Push failed");
        });
      });
    });
