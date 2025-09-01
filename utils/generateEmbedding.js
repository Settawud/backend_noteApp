// import { OpenAI } from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key to the .env file
// });

// export const generateEmbedding = async (text) => {
//   try {
//     const response = await openai.embeddings.create({
//       model: "text-embedding-ada-002",
//       input: text,
//     });
//     // console.log("OpenAI Embedding Response:", response.data);
//     return response.data[0].embedding; // Return the embedding vector
//   } catch (error) {
//     console.error("Error generating embedding:", error);
//     throw new Error("Failed to generate embedding");
//   }
// };

// ...existing code...
import dotenv from "dotenv";
dotenv.config();

function clean(v = "") {
  return String(v).replace(/^['"]|['"]$/g, "").trim();
}

export async function generateEmbedding(text) {
  const key = clean(process.env.OPENAI_API_KEY);
  if (!key) {
    console.warn("OPENAI_API_KEY not set — skipping embedding, returning null");
    return null;
  }

  try {
    const { OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: key });

    const resp = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return resp.data?.[0]?.embedding ?? null;
  } catch (err) {
    console.error("OpenAI embedding error:", err?.message || err);
    return null;
  }
}

export default generateEmbedding;
// ...existing code...

// // ...existing code...
// import dotenv from "dotenv";
// dotenv.config();

// function clean(v = "") {
//   return String(v).replace(/^['"]|['"]$/g, "").trim();
// }

// export async function generateEmbedding(text) {
//   const key = clean(process.env.OPENAI_API_KEY);
//   if (!key) {
//     console.warn("OPENAI_API_KEY not set — skipping OpenAI embedding and returning null");
//     return null;
//   }

//   const { OpenAI } = await import("openai");
//   const client = new OpenAI({ apiKey: key });

//   const resp = await client.embeddings.create({
//     model: "text-embedding-3-small",
//     input: text,
//   });

//   return resp.data?.[0]?.embedding ?? null;
// }
// // ...existing code...
