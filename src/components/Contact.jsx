import { ToastContainer, toast } from "react-toastify"
import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { FadeContainer, mobileNavItemSideways } from "../assets/FramerMotionVariants"
import Ripples from "react-ripples"
import { useRef } from "react"
import "react-toastify/dist/ReactToastify.css"
import { HiClipboardCopy } from "react-icons/hi"
import { useTranslation } from "react-i18next"

export default function Contact() {

    const { t } = useTranslation();

    const sendButtonRef = useRef(null);
    const formRef = useRef(null);

    const FailToastId = "failed";

    function sendEmail(e) {
        e.preventDefault();

        const data = {
            to_name: "Mateusz Stęgierski",
            user_name: e.target.name.value,
            user_email: e.target.email.value,
            message: e.target.message.value,
        };

        if (!validateForm(data)) {
            toast.error("Please fill in all fields", {
                toastId: FailToastId,
            });
            return;
        }

        sendButtonRef.current.disabled = true;
        sendButtonRef.current.innerText = t("toastSending");

        const toastId = toast.loading(t("toastSending"));

        console.log(import.meta.env.VITE_SERVICE_ID);

        emailjs.send(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            data,
            import.meta.env.VITE_PUBLIC_KEY
        ).then((response) => {
            formRef.current.reset();
            toast.update(toastId, {
                render: t("toastSent"),
                type: toast.TYPE.SUCCESS,
                isLoading: false,
                autoClose: 3000,
            });
            sendButtonRef.current.disabled = false;
            sendButtonRef.current.innerText = t("contactSend");
        }).catch((error) => {
            toast.update(toastId, {
                render: t("toastError"),
                type: toast.TYPE.ERROR,
                isLoading: false,
                autoClose: 3000,
            });
            sendButtonRef.current.disabled = false;
            sendButtonRef.current.innerText = t("contactSend");
        });
    }

    function validateForm(data) {
        for (const key in data) {
            if (data[key] === "") return false;
        }
        return true;
    }


    return (
        <section className=" md:mx-auto lg:mx-80 mt-10 flex flex-col" id="contact me">
            <div className="w-full max-w-xl mx-auto">
            <p className="text-4xl font-semibold text-gray-100 font-sarina mb-5 text-center">{t("mainContact")}</p>
                <div className="text-lg font-semibold text-gray-100 font-sarina flex flex-row justify-center md:justify-start">
                    <a href="mailto:mstegierski@gmail.com" className="text-blue-500 hover:text-blue-700 mb-5">
                        mstegierski@gmail.com
                    </a>
                    <div className="ml-2 text-blue-500 hover:text-blue-700" onClick={() => {
                        navigator.clipboard.writeText("mstegierski@gmail.com");
                        toast.info(t("toastCopy"), {
                            autoClose: 1000,
                            icon: <HiClipboardCopy className="inline-block w-5 h-5 mx-1" />,
                        });
                    }
                    }>
                        <HiClipboardCopy className="w-7 h-7 cursor-pointer" />
                    </div>
                </div>
            </div>
            <motion.form
                ref={formRef}
                initial="hidden"
                whileInView="visible"
                variants={FadeContainer}
                viewport={{ once: true }}
                className="flex flex-col items-center w-full max-w-xl mx-auto mb-10 dark:text-gray-300"
                onSubmit={sendEmail}
            >
                <motion.div
                    variants={mobileNavItemSideways}
                    className="relative z-0 w-full mb-6 group"
                >
                    <input
                        type="text"
                        name="name"
                        id="floating_name"
                        className="block w-full px-0 py-2 mt-2 text-sm bg-transparent border-0 border-b-2 appearance-none border-slate-500 text-white dark:border-gray-400 focus:outline-none focus:ring-0 focus:dark:border-white focus:border-slate-300 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("contactName")}
                    </label>
                </motion.div>
                <motion.div
                variants={mobileNavItemSideways}
                className="relative z-0 w-full mb-6 group"
                >
                <input
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block w-full px-0 py-2 mt-2 text-sm bg-transparent border-0 border-b-2 appearance-none border-slate-500 text-white dark:border-gray-400 focus:outline-none focus:ring-0 focus:dark:border-white focus:border-slate-300 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {t("contactEmail")}
                </label>
                </motion.div>
                <motion.div
                variants={mobileNavItemSideways}
                className="relative z-0 w-full mb-6 group"
                >
                <textarea
                    name="message"
                    id="floating_message"
                    className="block py-2 mt-2 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-500 appearance-none text-white dark:border-gray-400 dark:focus:border-white focus:outline-none focus:ring-0  peer min-h-[100px] resize-y focus:border-slate-300 "
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="floating_message"
                    className="peer-focus:font-medium absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {t("contactMessage")}
                </label>
                </motion.div>

                <motion.div
                variants={mobileNavItemSideways}
                className="w-full overflow-hidden rounded-lg shadow-lg sm:max-w-sm"
                >
                <Ripples
                    className="flex justify-center w-full"
                    color="rgba(225, 225,225,0.2)"
                >
                    <button
                    ref={sendButtonRef}
                    type="submit"
                    className="relative w-full px-4 py-3 overflow-hidden text-sm font-medium text-center text-white transition duration-300 rounded-lg outline-none bg-neutral-800 dark:bg-darkSecondary active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                    >
                    {t("contactSend")}
                    </button>
                </Ripples>
                </motion.div>
            </motion.form>
            <ToastContainer
                theme={"dark"}
                style={{ zIndex: 1000 }}
            />
        </section>
    )
}