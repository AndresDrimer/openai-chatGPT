import ChatGPT from './ChatGPT'

export default function Home() {
  

  return (
    <main className="w-full">
      <div className="flex flex-col itmes-center justify-center  w-2/3 mx-auto mt-40 text-center">
        <h1 className="text-6xl">Hi, I´m AVA robot</h1>
      </div>

      <div className="my-12 flex flex-col justify-center items-center">
        <ChatGPT />
       
      </div>

    </main>
  );
}
