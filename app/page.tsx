import Image from "next/image";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return <div><Button highContrast><Link href={"/issues/new"}>Create a new issue</Link></Button></div>;
}
