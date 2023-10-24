import styles from "./web-share.module.css";

export const WebShare = () => {
  const shareTextAndLinksHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Какой-то заголовок",
          text: "Какой-то текст",
          url: "https://google.com",
        })
        .then(() => console.log("Удалось поделиться"))
        .catch((error) => console.log("Не удалось поделиться", error));
    } else {
      console.log("API не поддерживается");
    }
  };

  const sharePdfHandler = async () => {
    const response = await fetch("testPdf.pdf");
    const blob = await response.blob();
    const filesArray = [
      new File([blob], "testPdf.pdf", {
        type: "application/pdf",
        lastModified: new Date().getTime(),
      }),
    ];

    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      navigator
        .share({
          files: filesArray,
          title: "Какой-то заголовок",
          text: "Какой-то текст",
        })
        .then(() => console.log("Удалось поделиться."))
        .catch((error) => console.log("Не удалось поделиться", error));
    } else {
      console.log(`Ваша система не поддерживает обмен файлами.`);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Web Share API</h1>
      <h2>Обмен текстом и ссылками</h2>
      <button onClick={shareTextAndLinksHandler}>
        Поделиться ссылкой или текстом
      </button>
      <h2>Обмен файлами</h2>
      <button onClick={sharePdfHandler}>Поделиться файлом</button>
    </div>
  );
};
