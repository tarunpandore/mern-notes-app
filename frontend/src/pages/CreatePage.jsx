import api from '../lib/axios'
import toast from 'react-hot-toast'
import { useState } from "react"
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content
      });
      toast.success("Note created successfully");
      navigate("/")
    } catch (error) {
      console.log("Error", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes to fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />Back to Home</Link>
          <div className="card bg-base-200">
            <div className="card-body">
              <div className="card-title text-2xl mb-4">Create New Note</div>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Title</span>
                    <input type="text" placeholder="Note Title" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </label>
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Content</span>
                    <input type="text" placeholder="Note Content" className="input input-bordered" value={content} onChange={(e) => setContent(e.target.value)} />
                  </label>
                </div>

                <div className="card-actions justify-end"><button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Create Note"}</button></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage