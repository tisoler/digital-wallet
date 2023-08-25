import App from '../components/app'

export default function Home() {
  return (
    <main className="flex md:h-screen md:max-h-screen flex-col items-center justify-start p-2 sm:p-6">
      <section className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm mb-2">
        <h1 className="border-b text-center border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static rounded-xl border p-4">
          Digital wallets
        </h1>
      </section>
      <App />
    </main>
  )
}
