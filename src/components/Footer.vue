<template>
    <div class="footer">
      <div class="footer_logo">
        <div class="footer_logo__text">
            LIN's BLOG
        </div>
      </div>
      <div class="footer_contact">
        <div class="footer_contact__text">
            email: reallinty@icloud.com
        </div>
        <div class="footer_contact__text">
            github:
            <a href="https://github.com/realllllty">
                https://github.com/realllllty
            </a>
        </div>
      </div>

      <div class="footer_credit">
        <div class="footer_credit__text">
            © 2025 LIN TIANYU
        </div>
      </div>
    </div>

</template>
<script setup>

</script>

<style scoped lang="scss">
// 先写一个不适配响应式架构的footer
.footer {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 60px;
    border-top: 1px solid #000;
    min-width: 1100px;
    z-index: 3;
    position: relative;

    &_logo {
        width: 500px;
        &__text {
            font-weight: 300;
            font-size: 70px;
            font-style: italic;
            @include googleFonts("Alumni Sans Pinstripe");
        }
    }

    &_contact {
        flex-grow: 1;
        &__text {
            font-weight: 300;
            font-size: 40px;
            font-style: italic;
            @include googleFonts("Alumni Sans Pinstripe");
        }
    }

    &_credit {
        &__text {
            font-weight: 300;
            font-size: 40px;
            font-style: italic;
            @include googleFonts("Alumni Sans Pinstripe");
        }
    }
}
</style>