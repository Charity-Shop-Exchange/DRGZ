import Head from "next/head";
import BaseTemplate from "../components/BaseTemplate";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dropzone from "../components/Dropzone";
import Item from "../components/Item";
import ItemContainer from "../components/ItemContainer";
import { getAuthCookie } from "../utils/auth-cookies";
import useSWR from "swr";

export default function Books({ token }) {
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetcher);
  return (
    <DndProvider backend={HTML5Backend}>
      <BaseTemplate>
        <div className="flex-1 flex flex-col">
          {/* <div className="flex align-items-center justify-between w-full p-2">
          <div className="flex items-center text-black font-bold text-3xl px-2">
          Buying and selling is now zero effort
          </div>
          <div className="w-1/4">
          <Dropzone />
          </div>
        </div> */}
          <div className="flex-1 overflow-y-scroll">
            <ItemContainer>
              <Item
                subtitle="Ocean"
                name="Picture"
                price="90.32"
                imgPath="https://images.unsplash.com/photo-1467951591042-f388365db261?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
              <Item
                subtitle="The Tent"
                name="Fiction"
                price="90.32"
                imgPath="https://images.unsplash.com/photo-1531072901881-d644216d4bf9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80"
              />
              <Item
                subtitle="The Little Book of Hygge"
                name="Self-improvement"
                price="90.32"
                imgPath="https://images.unsplash.com/photo-1594312915251-48db9280c8f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
              <Item
                subtitle="Bronze Dragon Codex"
                name="Fantasy"
                price="90.32"
                imgPath="https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
              />
            </ItemContainer>
          </div>
        </div>
      </BaseTemplate>
    </DndProvider>
  );
}

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  return { props: { token: token || null } };
}
