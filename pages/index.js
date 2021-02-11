import Head from "next/head";
import BaseTemplate from "../components/BaseTemplate";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dropzone from "../components/Dropzone";
import Item from "../components/Item";
import ItemContainer from "../components/ItemContainer";
import { getAuthCookie } from "../utils/auth-cookies";
import useSWR from "swr";

export default function Home({ token }) {
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetcher);
  return (
    <BaseTemplate>
    <div className="flex-1 flex flex-col">
      <DndProvider backend={HTML5Backend}>
        <div className="flex align-items-center justify-between w-full p-2">
          <div className="flex items-center text-black font-bold text-3xl px-2">
          Buying and selling is now zero effort
          </div>
          <div className="w-1/4">
          <Dropzone />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-scroll">
        <ItemContainer>
          <Item
            subtitle="Adidas"
            name="Yeezys"
            price="90.32"
            imgPath="/boosts.webp"
          />
          <Item
            subtitle="Adidas"
            name="Yeezys"
            price="90.32"
            imgPath="/boosts.webp"
          />
          <Item
            subtitle="Adidas"
            name="Yeezys"
            price="90.32"
            imgPath="/boosts.webp"
          />
          <Item
            subtitle="Adidas"
            name="Yeezys"
            price="90.32"
            imgPath="/boosts.webp"
          />
        </ItemContainer>
        </div>
      </DndProvider>
      </div>
    </BaseTemplate>
  );
}

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  return { props: { token: token || null } };
}
