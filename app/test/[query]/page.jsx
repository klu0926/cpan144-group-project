import { fetchData } from '../../lib/fetchData';

export default async function Page({params}) {
  const query = params.query

  const data = await fetchData(query);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
