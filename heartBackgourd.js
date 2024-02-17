

const bodyTag = document.getElementById('main')




function textAnimation(content, idxContent) {
    // Chọn phần tử chứa chữ cần thao tác
    const textElement = document.querySelector('.my-text-element');
    // textElement.textContent = content[idxContent]
    // Tách các từ ra và chuyển chúng thành mảng
    const characters = content[idxContent].split('');

    // Xóa nội dung của phần tử chứa chữ
    textElement.textContent = '';
    const wordSpan = document.createElement('span');
    // Vòng lặp qua mỗi chữ cái trong từ
    characters.forEach((character, index) => {
        // Tạo một phần tử span cho chữ cái
        const charSpan = document.createElement('span');
        charSpan.textContent = character;

        // Thêm phần tử span vào phần tử chứa chữ
        wordSpan.appendChild(charSpan);

        // Thiết lập hiệu ứng xuất hiện từ dưới lên cho từ đó
        gsap.from(charSpan, {
            opacity: 0, // Bắt đầu với opacity là 0 (chữ biến mất)
            y: '100%', // Di chuyển từ dưới lên
            duration: 0.5 ? character != " " : 0, // Thời gian để từ xuất hiện
            delay: index * 0.3, // Độ trễ giữa các chữ cái
            ease: 'power3.out', // Kiểu của animation,
            onComplete: () => {
                if (index == characters.length - 1) {
                    textElement.textContent = characters.join('');
                    hideText(content, idxContent)

                }

            }
        });

        // Thêm phần tử span vào phần tử chứa chữ
        textElement.appendChild(wordSpan);


    });


}
function hideText(content, idxContent) {
    // Chọn phần tử chứa chữ cần thao tác
    const textElement = document.querySelector('.my-text-element');

    // Tách các từ ra và chuyển chúng thành mảng
    const words = textElement.textContent.split('');

    // Xóa nội dung của phần tử chứa chữ
    textElement.textContent = '';

    // Vòng lặp qua mỗi từ trong mảng
    words.forEach((word, wordIndex) => {
        // Tạo một phần tử span cho từ đó
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;

        // Thêm phần tử span vào phần tử chứa chữ
        textElement.appendChild(wordSpan);

        // Thiết lập hiệu ứng biến mất từ trên xuống dưới cho từ
        gsap.to(wordSpan, {
            opacity: 0, // Chữ biến mất
            y: '100%', // Di chuyển từ trên xuống dưới
            duration: 0.01, // Thời gian để từ biến mất
            delay: wordIndex * 0.1, // Độ trễ giữa các từ
            ease: 'power3.in',
            onComplete: () => {
                if (wordIndex === words.length - 1 && idxContent !== content.length - 1) {
                    textAnimation(content, idxContent + 1)
                } else if (idxContent === content.length - 1) {
                    document.getElementById('link').click()
                }

            }
        });


    });

}
function heartBackgroundAnimation() {
    const heartBackground = document.getElementById('heart-background');

    // Tạo heart animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heartBackground.appendChild(heart);
        const background = [
            "#FF5733", "#FFBD33", "#F4FF33", "#A4FF33", "#33FFB3",
            "#33D8FF", "#3371FF", "#8333FF", "#D833FF", "#FF33E9",
            "#FF3383", "#FF334B", "#FFB633", "#FFD933", "#EBFF33",
            "#84FF33", "#33FF8C", "#33F5FF", "#3363FF", "#7C33FF"
        ];
        heart.style.backgroundColor = background[Math.floor(Math.random() * background.length)]

        const { clientWidth, clientHeight } = heartBackground;
        const x = Math.random() * clientWidth;
        const y = Math.random() * clientHeight;

        const scale = Math.random() * 0.75 + 0.25;
        const animationDuration = Math.random() * 4 + 2;

        gsap.set(heart, { x, y, scale, opacity: 1 });

        gsap.to(heart, {
            x: x - 50 + Math.random() * 100,
            y: y - 50 + Math.random() * 100,
            scale: scale * 0.5,
            opacity: 0,
            rotation: Math.random() * 360,
            duration: animationDuration,
            ease: "power2.inOut",
            onComplete: () => {
                heart.remove(); // Xóa heart sau khi hoàn thành animation
                createHeart(); // Tạo heart mới
            }
        });
    }

    // Tạo nhiều heart
    function createHearts() {
        for (let i = 0; i < 50; i++) {
            createHeart();
        }
    }

    // Gọi hàm tạo heart khi trang tải xong
    window.addEventListener('load', createHearts);

}
var content = ['Gửi Mỹ yêu', 'Valentine năm nay mình không cạnh nhau', 'Lên SG Tình sẽ bù cho Mỹ', 'Yêu Mỹ nhất']
heartBackgroundAnimation()
// heartMorse()
textAnimation(content, 0)
