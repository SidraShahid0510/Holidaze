function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-primary shadow-md animate-pulse">
          <div className="w-full aspect-[3/2] bg-gray-300"></div>

          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-300 w-1/2"></div>
            <div className="h-5 bg-gray-300 w-3/4"></div>
            <div className="h-4 bg-gray-300 w-1/3"></div>
            <div className="h-10 bg-gray-300 w-full mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileSkeleton;
