import { Calculator } from "@/components/Calculator";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Calculator</h1>
        <Calculator />
      </div>
      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;