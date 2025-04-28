import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();

        // Check if the fetched data is an array
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          console.error("Transactions fetched are not an array:", data);
          setTransactions([]); // Set empty data if the response is not an array
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]); // Set empty data in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Handle editing a transaction
  const handleEdit = (txn) => {
    setEditingTransaction(txn);
    setUpdatedDescription(txn.description);
    setUpdatedAmount(txn.amount);
    setUpdatedDate(txn.date);
  };

  // Handle updating a transaction
  const handleUpdate = async (id) => {
    const updatedTxn = {
      description: updatedDescription,
      amount: updatedAmount,
      date: updatedDate,
    };

    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTxn),
      });

      if (res.ok) {
        const updatedData = await res.json();
        // Update the state with the updated transaction
        setTransactions(
          transactions.map((txn) =>
            txn._id === id ? { ...txn, ...updatedData } : txn
          )
        );
        setEditingTransaction(null); // Close the edit form
      } else {
        console.error("Failed to update transaction.");
      }
    } catch (error) {
      console.error("Error during update request:", error);
    }
  };

  // Handle deleting a transaction
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTransactions(transactions.filter((txn) => txn._id !== id));
      } else {
        console.error("Failed to delete transaction.");
      }
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading transactions...</p>;
  }

  return (
    <section className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        transactions.map((txn) => (
          <Card key={txn._id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold">{txn.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {txn.amount >= 0 ? "+" : "-"}${Math.abs(txn.amount)}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(txn._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(txn)} // Trigger edit
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {editingTransaction && (
        <div className="mt-4 p-4 border rounded-md">
          <h3 className="font-semibold">Edit Transaction</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingTransaction._id);
            }}
          >
            <div>
              <label>Description</label>
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="number"
                value={updatedAmount}
                onChange={(e) => setUpdatedAmount(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label>Date</label>
              <input
                type="date"
                value={updatedDate}
                onChange={(e) => setUpdatedDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button type="submit">Update</Button>
              <Button
                variant="outline"
                onClick={() => setEditingTransaction(null)} // Close edit form
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

