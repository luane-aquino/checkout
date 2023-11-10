import { useEffect, useState } from 'react';
import './styles.scss'
import { useLocation } from 'react-router-dom';

enum TabContentItemEnum {
  bag = 'bag',
  payment = 'payment',
  success = 'success'
}

const tabContent = {
  [TabContentItemEnum.bag]: [
    {
      title: 'sacola',
      selected: true,
      redirectToRoute: ''
    },
    {
      title: 'Pagamento',
      selected: false,
      redirectToRoute: ''
    },
    {
      title: 'Confirmação',
      selected: false,
      redirectToRoute: ''
    }
  ],
  [TabContentItemEnum.payment]: [
    {
      title: 'sacola',
      selected: false,
      redirectToRoute: '/bag'
    },
    {
      title: 'Pagamento',
      selected: true,
      redirectToRoute: ''
    },
    {
      title: 'Confirmação',
      selected: false,
      redirectToRoute: ''
    }
  ],
  [TabContentItemEnum.success]: [
    {
      title: 'sacola',
      selected: false,
      redirectToRoute: ''
    },
    {
      title: 'Pagamento',
      selected: false,
      redirectToRoute: ''
    },
    {
      title: 'Confirmação',
      selected: true,
      redirectToRoute: ''
    }
  ]
}

type ListItemType = {
  title: string
  selected: boolean
  redirectToRoute: string
}

const Tabs = () => {
  let location = useLocation()
  const [list, setList] = useState<ListItemType[]>()

  useEffect(() => {
    const pathToTabContentItem: Record<string, TabContentItemEnum> = {
      bag: TabContentItemEnum.bag,
      payment: TabContentItemEnum.payment,
      success: TabContentItemEnum.success,
    };

    const path = location.pathname.replace(/\//, '');
    const tabContentItem = pathToTabContentItem[path];
    if (tabContentItem) {
      setList(tabContent[tabContentItem]);
    }
  }, [location]);

  return (
    <div className="Tabs">
      <div role="tablist" className="tablist">
        {list?.map((item, index) => (<button role="tab" key={index} className='tablist__btn'>{item.title}</button>))}
      </div>
    </div>
  );
}

export default Tabs;
