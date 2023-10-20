import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../components/Spinner';
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:5555/books").then((response) => {
            setBooks(response.data.data);
            console.log(books);
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        });
    }, []);
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">No</th>
                            <th className="border border-slate-600 rounded-md">Title</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                            <th className="border border-slate-600 rounded-md">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book,index)=>{
                            return (
                            <tr key={book._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {book.title}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {book.author}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {book.publishyear}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    <div className="flex justify-around items-center">
                                        <Link to={`/books/${book._id}/details`}>
                                            <BsInfoCircle className="bg-blue-400 border p-1 border-slate-700 h-8 w-8 rounded-md"/>
                                        </Link>
                                        <Link to={`/books/${book._id}/edit`}>
                                            <AiOutlineEdit className="bg-yellow-400 border p-1 border-slate-700 h-8 w-8 rounded-md"/>
                                        </Link>
                                        <Link to={`/books/${book._id}/delete`}>
                                            <AiOutlineDelete className="bg-red-400 border p-1 border-slate-700 h-8 w-8 rounded-md"/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            )
            }
        </div>
    )
}

export default Home;