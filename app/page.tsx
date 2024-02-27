import Image from "next/image";

import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPosts } from "@/lib/actions";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <h1 className="sticky top-36 z-[5] mb-8 mt-16 rounded-full bg-white px-4 py-2 text-2xl font-bold">
        recents
      </h1>

      <section className="mb-20 w-full space-y-4 px-4">
        {posts?.map((post) => (
          <CardComponent
            key={post.id}
            title={post.title}
            description={post.description}
            imageUrl={post.content}
          />
        ))}
        {/* <div className="flex w-full"> */}
        {/*   <Button className="mx-auto px-8">load more</Button> */}
        {/* </div> */}
      </section>
    </main>
  );
}

interface ICardComponent {
  title: string;
  description: string;
  imageUrl: string;
}

const CardComponent = ({ title, description, imageUrl }: ICardComponent) => (
  <Card className="w-full sm:mx-auto sm:flex sm:max-w-[500px] sm:justify-between">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="relative h-64 sm:w-1/2">
      <Image src={imageUrl} alt={title} fill className="sm:rounded-r-xl" />
    </CardContent>
  </Card>
);
