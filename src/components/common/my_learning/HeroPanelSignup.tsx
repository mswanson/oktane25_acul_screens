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
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-6">
            <h2 className="text-4xl max-w-lg mx-auto font-bold leading-tight text-left">
              Transform Your Future with Professional Skills
            </h2>
            <p className="text-xl text-white/90 max-w-lg mx-auto leading-relaxed text-left">
              Build in-demand skills with courses designed for working
              professionals
            </p>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/95">
                  Flexible learning schedule
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/95">
                  Real-world project experience
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/95">
                  Career advancement support
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/95">
                  Lifetime access to materials
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPanelLogin;
