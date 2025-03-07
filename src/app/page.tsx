import Link from "next/link";
import {
  Briefcase,
  Layers,
  ExternalLink,
  MailIcon,
  FlowerIcon,
  ChevronRight,
  Linkedin,
  Github,
} from "lucide-react";

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
    <main className="max-w-2xl my-20 mx-auto px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold">Hi. I&apos;m Lucas Jansen.</h1>
        <h1 className="text-3xl font-bold mb-8">
          <span className="text-neutral-500 mr-2">Frontend developer from</span>
          <span className="bg-neutral-100 px-2 inline-flex border-neutral-200 border items-center gap-1 rounded-lg">
            Amsterdam
            <span className="text-base font-medium">
              {weatherData &&
                !weatherError &&
                `${weatherData.current.temperature_2m}${weatherData.current_units.temperature_2m}`}
            </span>
          </span>
        </h1>
        <p className="text-lg text-neutral-600">
          Currently, I&apos;m expanding Revasi to the rest of Indonesia and
          working on freelance projects on the side.
        </p>
      </div>

      <div className="my-4">
        <Link
          href="mailto:wlajansen16@gmail.com"
          className="text-neutral-900 p-2 w-fit flex items-center gap-2 rounded-lg border-neutral-300 border"
        >
          <MailIcon className="h-4 w-4 mr-2" />
          Send me an email
        </Link>
      </div>

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
              <div className="font-medium text-neutral-900">Revasi</div>
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
              <div className="font-medium text-neutral-900">Let&apos;s eat</div>
              <div className="text-sm text-neutral-600 mt-1">
                Not sure what to eat? Let&apos;s eat will help you decide.
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

      <div className="space-y-4 -ml-4">
        <Link href="https://locavorenxt.revasi.net">
          <div className="group p-4 rounded-lg border border-transparent hover:border-neutral-200 hover:bg-neutral-50 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-lg font-normal">Revasi</h4>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  Booking now
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-transparent group-hover:text-neutral-400 transition-all duration-200" />
            </div>
            <p className="text-gray-500">
              Fine dining reservations management platform
            </p>
          </div>
        </Link>
      </div>

      <footer className="mt-8 pt-10 border-t border-neutral-200">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-sm">
            <div className="mb-3">
              <Link
                href="https://digics.net"
                className="font-semibold text-lg inline-flex items-center group"
              >
                Digics
                <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
              </Link>
            </div>
            <p className="text-neutral-600 text-sm mb-4">
              Digital consultancy specialized in building beautiful, functional
              digital products and experiences for forward-thinking companies.
            </p>
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Lucas Jansen. All rights reserved.
            </p>
          </div>

          <div>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/in/lucas-jansen-boekee-69a220187/"
                className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/wlaj"
                className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
