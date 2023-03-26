import { useTabStore } from "@/stores/utils";
import React from "react";

const TabLinks = ({ user }) => {
  // const TAB_LIST = [
  //   { name: "Vitals", key: 1 },
  //   { name: "Physical Examinations", key: 2 },
  //   { name: "Eye Examination", key: 3 },
  //   { name: "Lab Investigations", key: 4 },
  //   { name: "Further Investigations", key: 5 },
  //   { name: "Summary/Conclusion", key: 6 },
  //   { name: "Recommendation", key: 7 },
  // ];
  const keys = user.role.meta.keys;
  const TAB_LIST = keys.length > 0 ? Array(...keys) : Array(keys);

  const tabState = useTabStore();

  const handleTabClick = (key) => () => {
    tabState.setActiveTab(key);
  };
  return (
    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
      {/* {JSON.stringify(TAB_LIST)} */}
      {TAB_LIST.map((tab) => {
        return (
          <li
            class="nav-item sc"
            key={tab.key}
            onClick={handleTabClick(tab.key)}
          >
            <a
              class={`nav-link ${
                tab.key == tabState.activeTab ? "active" : ""
              }`}
            >
              {tab.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TabLinks;
