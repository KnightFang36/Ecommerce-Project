export default function UserProfile({params}:any) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page
            <span className=" text-black p-2 ml-2 rounded-2xl bg-orange-400">{params.id}</span></p>

        </div>
    )  
}