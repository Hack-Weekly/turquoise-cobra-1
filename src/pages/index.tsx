import Head from "next/head";
import dynamic from 'next/dynamic';

// we mount the view client-side because of local storage
const TaskView = dynamic(() => import('@/features/Todo/TaskView'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Cobra Tasks</title>
        <meta name="description" content="Todo app made my Cobra" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto font-light">
        <TaskView />
      </main>
    </>
  );
}
