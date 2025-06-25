export default function AuthErrorPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">Authentication Error!</h1>
            <p>An <b>Unknown error</b> occurred while logging you in.</p>
            <p>Please try again.</p>
        </main>
    )
}