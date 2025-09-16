import adultStudentsImage from "@/assets/hero_images/adult-students-learning.jpg";

const HeroPanelLogin = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
      <img
        src={adultStudentsImage}
        alt="Adult students learning together"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80" />
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="text-white space-y-6">
          <h2 className="text-4xl max-w-lg mx-auto font-bold leading-tight text-left">
            Advance Your Career with Expert-Led Training
          </h2>
          <p className="text-xl text-white/90 max-w-lg mx-auto leading-relaxed text-left">
            Join thousands of professionals who have transformed their careers
            through our comprehensive courses
          </p>
          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">
                Industry-recognized certifications
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">Learn at your own pace</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">
                Expert instructors and mentorship
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">
                Practical, hands-on projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPanelLogin;
