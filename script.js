document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const form = document.getElementById('multi-page-form');
    let currentPageIndex = 0;

    function showPage(index) {
        pages.forEach((page, i) => {
            if (i === index) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }

    function goToNextPage(event) {
        // التحقق من صحة المدخلات في الصفحة الحالية
        const currentPage = pages[currentPageIndex];
        const inputs = currentPage.querySelectorAll('input');
        let allInputsValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allInputsValid = false;
                input.reportValidity();
            }
        });

        if (allInputsValid) {
            currentPageIndex++;
            showPage(currentPageIndex);
        }
    }

    // الانتقال للصفحة التالية عند الضغط على زر "التالي"
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', goToNextPage);
    });

    // إرسال النموذج عند الضغط على زر "إرسال" في الصفحة الأخيرة
    form.addEventListener('submit', (event) => {
        // يمكن إضافة أي منطق إضافي هنا قبل الإرسال النهائي
        alert('تم إرسال البيانات بنجاح!');
    });

    // إرسال النموذج عند الضغط على مفتاح Enter في آخر صفحة
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && pages[currentPageIndex].id === 'page-3') {
            event.preventDefault(); // منع السلوك الافتراضي لـ Enter
            form.querySelector('.submit-btn').click();
        }
    });

    // إظهار الصفحة الأولى عند تحميل الصفحة
    showPage(currentPageIndex);
});