import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Calculator</h1>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;