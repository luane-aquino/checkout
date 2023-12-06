import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { TabContentItemEnum } from "../../../common/types";

const tabContent = {
  [TabContentItemEnum.bag]: [
    {
      title: "Sacola",
      selected: true,
      redirectToRoute: "",
    },
    {
      title: "Pagamento",
      selected: false,
      redirectToRoute: "",
    },
    {
      title: "Confirmação",
      selected: false,
      redirectToRoute: "",
    },
  ],
  [TabContentItemEnum.payment]: [
    {
      title: "Sacola",
      selected: false,
      redirectToRoute: "/bag",
    },
    {
      title: "Pagamento",
      selected: true,
      redirectToRoute: "",
    },
    {
      title: "Confirmação",
      selected: false,
      redirectToRoute: "",
    },
  ],
  [TabContentItemEnum.success]: [
    {
      title: "Sacola",
      selected: false,
      redirectToRoute: "",
    },
    {
      title: "Pagamento",
      selected: false,
      redirectToRoute: "",
    },
    {
      title: "Confirmação",
      selected: true,
      redirectToRoute: "",
    },
  ],
};

type ListItemType = {
  title: string;
  selected: boolean;
  redirectToRoute: string;
};

type TabsType = {
  path:
    | TabContentItemEnum.bag
    | TabContentItemEnum.payment
    | TabContentItemEnum.success;
};

const Tabs = ({ path }: TabsType) => {
  const navigate = useNavigate();
  const pathToTabContentItem: Record<string, TabContentItemEnum> = {
    bag: TabContentItemEnum.bag,
    payment: TabContentItemEnum.payment,
    success: TabContentItemEnum.success,
  };
  const tabContentItem = pathToTabContentItem[path];
  const list: ListItemType[] = tabContent[tabContentItem];

  return (
    <div className="Tabs">
      <div role="tablist" className="tablist">
        {list?.map((item, index) => (
          <button
            role="tab"
            key={index}
            className={`tablist__btn ${item.selected && "tablist__active"}`}
            onClick={() => navigate(item.redirectToRoute)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
