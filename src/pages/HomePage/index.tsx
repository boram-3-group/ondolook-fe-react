import { useFetchWeather } from './fetches/useFetchWeather';

// interface HomePageProps {}

export function HomePage() {
  const { data, isLoading } = useFetchWeather({ format: 'j1' });
  return (
    <>
      Home
      <div>{JSON.stringify(isLoading)}</div>
      <div> {JSON.stringify(data)}</div>
    </>
  );
}
