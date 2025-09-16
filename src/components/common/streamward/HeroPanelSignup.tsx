import workforceTrainingImage from "@/assets/hero_images/workforce-training.jpg";

const HeroPanelSignup = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
      <img
        src={workforceTrainingImage}
        alt="Professional workforce training facility with electricians and welders"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80" />
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="text-center text-white space-y-6">
          <h2 className="text-4xl max-w-lg mx-auto font-bold leading-tight text-left">
            Build Your Future with Industry Certifications
          </h2>
          <p className="text-xl text-white/90 max-w-lg mx-auto leading-relaxed text-left">
            Start your path to earning valuable certifications that employers
            demand in today's skilled trades
          </p>
          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">
                Hands-on training facilities
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">Expert trade instructors</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">Job placement assistance</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/95">
                Flexible evening and weekend classes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPanelSignup;
