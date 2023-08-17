import { Server } from "socket.io";

export const sio = (server: any) => {
  return require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000/",
      credentials: true,
    },
  });
};

export const connectionSocket = (io: any) => {
  let cachedDocumentAnalyzed: any = {};

  io.on("connection", (socket: any) => {
    console.log(`socket ${socket.id} connected`);

    socket.on("infoSaveBackend", async (data: any) => {
      if (data?.token && data?.documentId) {
        if (
          !cachedDocumentAnalyzed[data?.token]?.[data?.documentId] &&
          data?.status == "processing"
        ) {
          cachedDocumentAnalyzed[data?.token] = {
            ...cachedDocumentAnalyzed[data?.token],
            [data?.documentId]: {
              filename: data?.filename,
              status: data?.status,
              count: 0,
            },
          };
          socket.emit("cachedDocumentAnalyzed", cachedDocumentAnalyzed);
        } else {
          if (
            cachedDocumentAnalyzed[data?.token][data?.documentId]?.count == 1 &&
            cachedDocumentAnalyzed[data?.token][data?.documentId]?.status ==
              "processing"
          ) {
            cachedDocumentAnalyzed[data?.token][data?.documentId] = {
              ...cachedDocumentAnalyzed[data?.token][data?.documentId],
              filename: data?.filename,
              status: data?.status,
            };
            socket.emit("cachedDocumentAnalyzed", cachedDocumentAnalyzed);
          }
        }
        // socket.emit('cachedDocumentAnalyzed', cachedDocumentAnalyzed)

        cachedDocumentAnalyzed[data?.token][data?.documentId] = {
          ...cachedDocumentAnalyzed[data?.token][data?.documentId],
          count:
            cachedDocumentAnalyzed[data?.token][data?.documentId]?.count + 1,
        };

        if (
          cachedDocumentAnalyzed[data?.token]?.[data?.documentId] &&
          cachedDocumentAnalyzed[data?.token]?.[data?.documentId]?.status !==
            "processing"
        ) {
          delete cachedDocumentAnalyzed[data?.token]?.[data?.documentId];
        }

        //Remove Object
        cachedDocumentAnalyzed = Object.entries(cachedDocumentAnalyzed).reduce(
          (a, [key, value]: any) => {
            if (Object.keys(value).length) {
              const tmp = {
                [key]: value,
              };
              Object.assign(a, tmp);
            }
            return a;
          },
          {}
        );
      }
    });

    socket.emit("cachedDocumentAnalyzed", cachedDocumentAnalyzed);

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};
