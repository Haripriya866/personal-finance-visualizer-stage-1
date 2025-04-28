import { connectDB } from "@/lib/dbConnect";
import Transaction from "@/models/transaction";

// PUT - Update a transaction
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const updatedTransaction = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedTransaction) {
      return Response.json({ message: "Transaction not found" }, { status: 404 });
    }
    return Response.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Failed to update transaction" }, { status: 500 });
  }
}

// DELETE - Delete a transaction
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Transaction.findByIdAndDelete(params.id);
    return Response.json({ message: "Transaction deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Failed to delete transaction" }, { status: 500 });
  }
}
