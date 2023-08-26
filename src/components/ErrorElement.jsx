import { Link } from "react-router-dom";

export default function ErrorElement() {
    return (
        <div className="min-h-screen flex justify-center items-center font-black text-center">
            <p className="text-4xl">PAGE NOT FOUND<br/>😥<br/>
            <p className="block my-3 text-2xl text-blue-600 underline decoration-blue-600 active:text-red-600 active:decoration-red-600">
                <Link to={"/all"}>Go to Home</Link></p>
            </p>
        </div>
    )
}