import { connectToDB, connectionString } from "@/backEnd/lib/connectMongoDb";
import { UserModel } from "@/backEnd/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

export const GET = async (request: Request) => {
  console.log(`kv_${request.url.split("/")[6]}`);

  try {
    await connectToDB();

    const collection = await mongoose.connection
      .collection(`kv_${request.url.split("/")[6]}`)
      .find()
      .toArray();
    console.log(collection);

    // const documents = await collection.find({}).toArray();
    return NextResponse.json(
      {
        error: false,
        message: "success",
        data: collection || [],
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        error: true,
        message: "Kv not found",
      },
      {
        status: 400,
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const data = await mongoose.connection
      .collection(`kv_${request.url.split("/")[6]}`)
      .deleteOne({
        value: request.url.split("/")[7],
      });
    console.log(data);

    return NextResponse.json(
      {
        error: false,
        message: "success",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
};
