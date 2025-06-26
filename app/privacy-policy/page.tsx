export default function PrivacyPolicy() {
  return (
    <main className="max-w-2xl mx-auto p-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        CalGist accesses your Google Calendar data to generate AI-powered summaries of your events.
        Only essential event information (such as event ID and the generated summary) is stored securely
        in our Supabase database linked to your account.
      </p>

      <p className="mb-4">
        We do not store full event descriptions, titles, or personal calendar data unless necessary for the summary.
        Your data is never shared, sold, or used for advertising.
      </p>

      <p className="mb-4">
        Authentication is securely handled using OAuth 2.0 via Google. You can revoke access anytime
        from your Google Account permissions.
      </p>

      <p>
        For any questions or concerns, feel free to contact the developer at
        <a href="mailto:eswardudi06@gmail.com" className="text-blue-600"> eswardudi06@gmail.com</a>.
      </p>
    </main>
  );
}
