import Navbar from "./Navbar";
export default function Contact() {
  return (
    <div>
        <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Get in Touch</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
            <input id="name" type="text" required
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300"
              placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input id="email" type="email" required
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300"
              placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
            <textarea id="message" rows="4" required
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300"
              placeholder="Your message..."></textarea>
          </div>
          <button type="submit"
            className="w-full bg-blue-300 hover:bg-blue-400 text-white font-medium py-2 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
</div>
    

  );
}
