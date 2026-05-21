function VenuePageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero image */}
      <div className="w-full aspect-[16/9] max-h-[60vh] bg-gray-300" />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.25fr] gap-10 mt-8 mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-6">
        {/* Left content */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-300 w-3/4" />

          <div className="h-5 bg-gray-200 w-1/3" />

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 w-full" />
            <div className="h-4 bg-gray-200 w-full" />
            <div className="h-4 bg-gray-200 w-2/3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-12 bg-gray-200" />
            <div className="h-12 bg-gray-200" />
            <div className="h-12 bg-gray-200" />
          </div>
        </div>

        {/* Booking panel */}
        <div className="bg-primary p-6 space-y-4">
          <div className="h-6 bg-gray-300 w-1/3" />

          <div className="h-14 bg-gray-200" />

          <div className="h-14 bg-gray-200" />

          <div className="h-14 bg-gray-200" />

          <div className="h-12 bg-gray-300" />
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-6 mt-10">
        <div className="h-[400px] bg-gray-300" />
      </div>
    </div>
  );
}

export default VenuePageSkeleton;
