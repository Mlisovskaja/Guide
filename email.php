<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = trim($_POST['user_name']);
    $phone = trim($_POST['user_phone']);
    $email = trim($_POST['user_email']);
    $comment = trim($_POST['user_comment']);

    // Проверка на пустые поля
    if (empty($name) || empty($phone) || empty($email)) {
        echo "Пожалуйста, заполните все обязательные поля.";
        exit; // Прерываем выполнение скрипта
    }

    // Валидация email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Неверный формат электронной почты.";
        exit; // Прерываем выполнение скрипта
    }

    // Форматирование сообщения
    $to = "mrs.tereshenko@gmail.com"; // Замените на свой адрес электронной почты
    $subject = "Новое сообщение с формы обратной связи";
    $message = "Имя: $name\nТелефон: $phone\nE-mail: $email\nКомментарий:\n$comment";
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n" .
               "Content-Type: text/plain; charset=utf-8";

    // Отправка письма
    if (mail($to, $subject, $message, $headers)) {
        echo "Спасибо за ваше сообщение!";
    } else {
        echo "Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.";
    }
} else {
    // Если не POST запрос, возвращаем ошибку
    echo "Неверный метод запроса.";
    exit; // Прерываем выполнение скрипта
}
?>