export default function Header() {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">SNDQ at home</h1>
      <p className="text-sm text-gray-500">Residentie d&apos;Urville</p>

      <div className="mt-6 border-b border-gray-200">
        <div className="flex">
          <button className="px-0 py-3 text-sm font-medium text-primary-blue border-b-2 border-primary-blue">
            Users
          </button>
        </div>
      </div>
    </div>
  );
}
