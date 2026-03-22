import { redirect } from "next/navigation";

function page() {
    redirect("/");
    return null;
}

export default page;