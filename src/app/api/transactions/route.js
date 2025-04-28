import { connectDB } from "@/lib/dbConnect";
import Transaction from "@/models/transaction";

// POST - Create a new transaction
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newTransaction = await Transaction.create(body);
    return new Response(JSON.stringify(newTransaction), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to create transaction" }),
      { status: 500 }
    );
  }
}

// GET - Get all transactions
export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    
    // Ensure that the response is an array
    if (!Array.isArray(transactions)) {
      throw new Error("Transactions are not in the expected array format");
    }

    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch transactions" }),
      { status: 500 }
    );
  }
}
