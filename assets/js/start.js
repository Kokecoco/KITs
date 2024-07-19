        window.onload = () => {
            setTimeout(() => {
                document.getElementById('text').classList.add('fade-in');
                document.getElementById('text').style.opacity = '1';
                document.getElementById('logo').style.transform = 'translateY(0)';
                document.getElementById('logo').style.opacity = '1';
            }, 1000);

            setTimeout(() => {
                document.getElementById('text').classList.remove('fade-in');
                document.getElementById('text').classList.add('fade-out');
                document.getElementById('text').style.opacity = '0';
                document.getElementById('logo').style.transform = 'translateY(-100%)';
                document.getElementById('logo').style.opacity = '0';
            }, 3500);

            setTimeout(() => {
                // 本当のサイトの表示処理
                window.location.href = 'https://www.kits-tools.net';
            }, 4000);
        };
