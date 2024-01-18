import { useTranslation } from "react-i18next";
import date from "../../helpers/date";
import { motion } from "framer-motion";
const profile = ({ info }) => {
  const [t] = useTranslation("global");
  const {
    name,
    email,
    telephone,
    dateRegister,
    premium,
    standard,
    admin,
    user,
    confirmed,
  } = info;
  const list = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    hidden: { opacity: 0 },
  };
  const item = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.6 } },
    hidden: { opacity: 0, y: -100 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={list}
      className="my-10 w-full md:w-1/2 capitalize"
    >
      <caption class="caption-top">
        <p className="my-2 text-2xl">{t("dashboard.information")}</p>
      </caption>
      <motion.table
        className="flex w-full justify-center shadow-lg"
        variants={item}
      >
        <tbody className="w-full">
          <tr className="bg-gray-100 flex flex-col rounded-l-lg">
            <motion.th
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-start flex justify-between"
            >
              {t("dashboard.name")}
            </motion.th>
            <motion.th
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-start flex justify-between"
            >
              {t("dashboard.dateRegister")}
            </motion.th>
            <motion.th
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-start flex justify-between"
            >
              {t("dashboard.telephone")}
            </motion.th>
            <motion.th
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-start flex justify-between"
            >
              {t("dashboard.email")}
            </motion.th>
            <motion.th
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-start flex justify-between"
            >
              {t("dashboard.user")}
            </motion.th>
            <motion.th
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-start flex justify-between"
            >
              {t("dashboard.membership")}
            </motion.th>
            <motion.th
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-start flex justify-between"
            >
              {t("dashboard.role")}
            </motion.th>
          </tr>
        </tbody>
        <tbody className="w-full">
          <tr className="flex flex-col w-full bg-white">
            <motion.td
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-end"
            >
              {name}
            </motion.td>
            <motion.td
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-end"
            >
              {date(dateRegister)}
            </motion.td>
            <motion.td
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-end"
            >
              {telephone}
            </motion.td>
            <motion.td
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-end"
            >
              {email}
            </motion.td>
            <motion.td
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-end"
            >
              {confirmed
                ? t("dashboard.confirmed")
                : t("dashboard.noConfirmed")}
            </motion.td>
            <motion.td
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-end"
            >
              {premium && t("dashboard.membershipPremium")}{" "}
              {standard && t("dashboard.membershipStandard")}
            </motion.td>
            <motion.td
              variants={item}
              className="p-3 text-xs font-light border-b-2 text-end"
            >
              {admin && t("dashboard.roleAdmin")}{" "}
              {user && t("dashboard.roleUser")}
            </motion.td>
          </tr>
        </tbody>
      </motion.table>
    </motion.div>
  );
};
export default profile;
