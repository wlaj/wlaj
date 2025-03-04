import Image from "next/image";
import Link from "next/link";
import {
  Cloud,
  Wind,
  Thermometer,
  Briefcase,
  Code,
  Layers,
  ExternalLink,
  MailIcon,
  FlowerIcon,
} from "lucide-react";

// Define types for the weather data
type WeatherData = {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    time: string;
  };
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  };
};

async function getWeatherData(): Promise<WeatherData> {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.3676&longitude=4.9041&current=temperature_2m,wind_speed_10m",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return res.json();
}

export default async function Home() {
  let weatherData: WeatherData | null = null;
  let weatherError = false;

  try {
    weatherData = await getWeatherData();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherError = true;
  }

  return (
    <main className="max-w-xl my-20 mx-auto px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold mb-8">
          Hi. I'm Lucas Jansen.{" "}
          <span className="text-neutral-500 mr-2">Frontend developer from</span>
          <span>Amsterdam</span>
        </h1>
        <p className="text-lg text-neutral-600">
          Currently, I'm expanding Revasi to the rest of Indonesia and working
          on freelance projects on the side.
        </p>
      </div>

      <div className="my-4">
        <Link
          href={"/about"}
          className="text-neutral-900 p-2 flex items-center gap-2 rounded-lg border-neutral-300 border"
        >
          <MailIcon className="h-4 w-4 mr-2" />
          Email
        </Link>
      </div>

      {weatherData && !weatherError && (
        <div className="my-6 p-4 bg-neutral-50 shadow-sm rounded-lg border border-neutral-100">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="h-5 w-5 text-neutral-700" />
            <span className="font-medium">Amsterdam Weather</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-neutral-500" />
              <span>
                {weatherData.current.temperature_2m}
                {weatherData.current_units.temperature_2m}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-neutral-500" />
              <span>
                {weatherData.current.wind_speed_10m}
                {weatherData.current_units.wind_speed_10m}
              </span>
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Last updated:{" "}
              {new Date(weatherData.current.time).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
      {weatherError && (
        <div className="my-6 p-4 bg-red-50 rounded-lg border border-red-100 text-red-600">
          Could not load weather data. Please try again later.
        </div>
      )}

      <div className="my-6 p-5 bg-neutral-50 rounded-lg border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-neutral-700" />
          <span className="font-medium text-neutral-900">
            Currently Working On
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-neutral-100 rounded-md border border-neutral-200 transition-all hover:shadow-sm">
            <div className="flex items-center justify-center h-10 w-10 bg-black rounded-md">
              <FlowerIcon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-neutral-900">
                Revasi
              </div>
              <div className="text-sm text-neutral-600 mt-1">
                Fine dining reservations management platform
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-xs text-neutral-500">Active project</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-neutral-100 rounded-md border border-neutral-200 transition-all hover:shadow-sm">
            <div className="flex items-center justify-center h-10 w-10 bg-blue-600 rounded-md">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-neutral-900">
                Let's eat
              </div>
              <div className="text-sm text-neutral-600 mt-1">
                Not sure what to eat? Let's eat will help you decide.
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-xs text-neutral-500">25% complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-8">Projects</h3>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h4 className="text-lg font-normal">Revasi</h4>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              Booking now
            </span>
          </div>
          <p className="text-gray-500">Design & Development Agency</p>
        </div>

        <div>
          <h4 className="text-lg font-normal mb-1">Let's eat</h4>
          <p className="text-gray-500">Premium Framer templates boutique</p>
        </div>

        <div>
          <h4 className="text-lg font-normal mb-1">Pohe</h4>
          <p className="text-gray-500">
            Website inspiration from the Dark Side
          </p>
        </div>

        <div>
          <h4 className="text-lg font-normal mb-1">Moneynow</h4>
          <p className="text-gray-500">Make a living with Framer templates</p>
        </div>
      </div>
    </main>
  );
}
