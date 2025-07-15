<template>
  <div class="login-page">
    <div class="header">
      <div class="logo">
        <VanIcon name="music-o" size="36" />
        <h1>有聲書</h1>
      </div>
      <p class="slogan">聆聽世界，隨時隨地</p>
    </div>

    <div class="form-container">
      <VanTabs v-model:active="activeTab" animated swipeable>
        <VanTab title="登入">
          <VanForm @submit="onLogin">
            <VanCellGroup inset>
              <VanField
                v-model="loginForm.username"
                name="username"
                label="用戶名"
                placeholder="請輸入用戶名"
                :rules="[{ required: true, message: '請填寫用戶名' }]"
              />
              <VanField
                v-model="loginForm.password"
                type="password"
                name="password"
                label="密碼"
                placeholder="請輸入密碼"
                :rules="[{ required: true, message: '請填寫密碼' }]"
              />
            </VanCellGroup>
            
            <div class="form-links">
              <VanCheckbox v-model="loginForm.remember">記住密碼</VanCheckbox>
              <span class="forgot-link" @click="showForgotPassword">忘記密碼？</span>
            </div>
            
            <div class="form-actions">
              <VanButton round block type="primary" native-type="submit" :loading="isSubmitting">
                登入
              </VanButton>
            </div>
          </VanForm>
        </van-tab>
        
        <VanTab title="註冊">
          <VanForm @submit="onRegister">
            <VanCellGroup inset>
              <VanField
                v-model="registerForm.username"
                name="username"
                label="用戶名"
                placeholder="請設定用戶名"
                :rules="[{ required: true, message: '請填寫用戶名' }]"
              />
              <VanField
                v-model="registerForm.phone"
                type="tel"
                name="phone"
                label="手機號碼"
                placeholder="請輸入手機號碼"
                :rules="[
                  { required: true, message: '請填寫手機號碼' },
                  { pattern: /^1[3-9]\d{9}$/, message: '手機號碼格式不正確' }
                ]"
              />
              <VanField
                v-model="registerForm.code"
                center
                clearable
                label="驗證碼"
                placeholder="請輸入簡訊驗證碼"
                :rules="[{ required: true, message: '請填寫驗證碼' }]"
              >
                <template #button>
                  <VanButton
                    size="small"
                    type="primary"
                    :disabled="codeSent"
                    @click="sendVerificationCode"
                  >
                    {{ codeText }}
                  </VanButton>
                </template>
              </VanField>
              <VanField
                v-model="registerForm.password"
                type="password"
                name="password"
                label="密碼"
                placeholder="請設定密碼"
                :rules="[
                  { required: true, message: '請設定密碼' },
                  { min: 6, message: '密碼至少6位字符' }
                ]"
              />
              <VanField
                v-model="registerForm.confirmPassword"
                type="password"
                name="confirmPassword"
                label="確認密碼"
                placeholder="請再次輸入密碼"
                :rules="[
                  { required: true, message: '請確認密碼' },
                  { validator: validateConfirmPassword, message: '兩次密碼不一致' }
                ]"
              />
            </VanCellGroup>
            
            <div class="agreement">
              <VanCheckbox v-model="registerForm.agreement" shape="square">
                我已閱讀並同意
                <span class="link" @click.stop="showAgreement">用戶協議</span>
                和
                <span class="link" @click.stop="showPrivacyPolicy">隱私政策</span>
              </VanCheckbox>
            </div>
            
            <div class="form-actions">
              <VanButton round block type="primary" native-type="submit" :disabled="!registerForm.agreement" :loading="isSubmitting">
                註冊
              </VanButton>
            </div>
          </VanForm>
        </van-tab>
      </VanTabs>
    </div>
    
    <div class="third-party-login">
      <p>第三方登入</p>
      <div class="third-party-icons">
        <VanIcon name="wechat" size="28" color="#07c160" @click="thirdPartyLogin('wechat')" />
        <VanIcon name="weibo" size="28" color="#ff8200" @click="thirdPartyLogin('weibo')" />
        <VanIcon name="comment-circle-o" size="28" color="#07c160" @click="thirdPartyLogin('qq')" />
      </div>
    </div>
    
    <VanPopup v-model:show="forgotPasswordVisible" position="bottom" round :style="{ height: '80%' }">
      <div class="popup-title">重設密碼</div>
      <VanForm @submit="resetPassword">
        <VanCellGroup inset>
          <VanField
            v-model="forgotForm.phone"
            type="tel"
            label="手機號碼"
            placeholder="請輸入手機號碼"
            :rules="[
              { required: true, message: '請填寫手機號碼' },
              { pattern: /^1[3-9]\d{9}$/, message: '手機號碼格式不正確' }
            ]"
          />
          <VanField
            v-model="forgotForm.code"
            center
            clearable
            label="驗證碼"
            placeholder="請輸入簡訊驗證碼"
            :rules="[{ required: true, message: '請填寫驗證碼' }]"
          >
            <template #button>
              <VanButton
                size="small"
                type="primary"
                :disabled="forgotCodeSent"
                @click="sendForgotVerificationCode"
              >
                {{ forgotCodeText }}
              </VanButton>
            </template>
          </VanField>
          <VanField
            v-model="forgotForm.newPassword"
            type="password"
            label="新密碼"
            placeholder="請設定新密碼"
            :rules="[
              { required: true, message: '請設定新密碼' },
              { min: 6, message: '密碼至少6位字符' }
            ]"
          />
          <VanField
            v-model="forgotForm.confirmNewPassword"
            type="password"
            label="確認密碼"
            placeholder="請再次輸入新密碼"
            :rules="[
              { required: true, message: '請確認密碼' },
              { validator: validateForgotConfirmPassword, message: '兩次密碼不一致' }
            ]"
          />
        </VanCellGroup>
        <div style="margin: 16px;">
          <VanButton round block type="primary" native-type="submit" :loading="isSubmitting">
            重設密碼
          </VanButton>
          <VanButton round block plain style="margin-top: 12px;" @click="forgotPasswordVisible = false">
            取消
          </VanButton>
        </div>
      </VanForm>
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  Button as VanButton,
  Field as VanField,
  Form as VanForm,
  Icon as VanIcon,
  Tabs as VanTabs,
  Tab as VanTab,
  Checkbox as VanCheckbox,
  CellGroup as VanCellGroup,
  Popup as VanPopup,
  showToast,
  showDialog
} from 'vant'

const router = useRouter()
const activeTab = ref(0)
const isSubmitting = ref(false)
const forgotPasswordVisible = ref(false)

// 登入表單
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

// 註冊表單
const registerForm = reactive({
  username: '',
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 忘記密碼表單
const forgotForm = reactive({
  phone: '',
  code: '',
  newPassword: '',
  confirmNewPassword: ''
})

// 驗證碼相關
const countdown = ref(60)
const codeSent = ref(false)
const codeText = ref('獲取驗證碼')
const forgotCodeSent = ref(false)
const forgotCodeText = ref('獲取驗證碼')

// 表單驗證
const validateConfirmPassword = () => {
  return registerForm.password === registerForm.confirmPassword
}

const validateForgotConfirmPassword = () => {
  return forgotForm.newPassword === forgotForm.confirmNewPassword
}

// 發送驗證碼
const startCountdown = (isForgot = false) => {
  const targetRef = isForgot ? forgotCodeSent : codeSent
  const textRef = isForgot ? forgotCodeText : codeText
  
  targetRef.value = true
  countdown.value = 60
  
  const timer = setInterval(() => {
    countdown.value--
    textRef.value = `${countdown.value}秒後重發`
    
    if (countdown.value <= 0) {
      clearInterval(timer)
      targetRef.value = false
      textRef.value = '獲取驗證碼'
    }
  }, 1000)
}

const sendVerificationCode = () => {
  if (!registerForm.phone || !/^1[3-9]\d{9}$/.test(registerForm.phone)) {
    showToast('請輸入正確的手機號碼')
    return
  }
  
  // 模擬發送驗證碼
  showToast('驗證碼已發送')
  startCountdown()
}

const sendForgotVerificationCode = () => {
  if (!forgotForm.phone || !/^1[3-9]\d{9}$/.test(forgotForm.phone)) {
    showToast('請輸入正確的手機號碼')
    return
  }
  
  // 模擬發送驗證碼
  showToast('驗證碼已發送')
  startCountdown(true)
}

// 表單提交
const onLogin = () => {
  isSubmitting.value = true
  
  // 模擬登入請求
  setTimeout(() => {
    isSubmitting.value = false
    showToast('登入成功')
    router.push('/home')
  }, 1500)
}

const onRegister = () => {
  isSubmitting.value = true
  
  // 模擬註冊請求
  setTimeout(() => {
    isSubmitting.value = false
    showToast('註冊成功')
    activeTab.value = 0 // 切換到登入頁
  }, 1500)
}

const resetPassword = () => {
  isSubmitting.value = true
  
  // 模擬重設密碼請求
  setTimeout(() => {
    isSubmitting.value = false
    showToast('密碼重設成功')
    forgotPasswordVisible.value = false
  }, 1500)
}

// 顯示忘記密碼彈窗
const showForgotPassword = () => {
  forgotPasswordVisible.value = true
}

// 顯示協議彈窗
const showAgreement = () => {
  showDialog({
    title: '用戶協議',
    message: '感謝您使用有聲書App，本協議包含服務條款及隱私政策，使用前請您仔細閱讀並理解本協議內容。',
    confirmButtonText: '我已閱讀'
  })
}

const showPrivacyPolicy = () => {
  showDialog({
    title: '隱私政策',
    message: '本應用尊重並保護用戶個人隱私，我們會收集必要的信息來提供服務，但絕不會將信息提供給無關第三方。',
    confirmButtonText: '我已閱讀'
  })
}

// 第三方登入
const thirdPartyLogin = (platform: string) => {
  showToast(`正在跳轉至${platform}授權登入...`)
  // 實際項目中這裡應該跳轉到第三方授權頁面
}
</script>

<style lang="scss" scoped>
.login-page {
  padding: 24px 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  .header {
    text-align: center;
    margin-bottom: 40px;
    
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      
      .van-icon {
        color: #1989fa;
        margin-right: 8px;
      }
      
      h1 {
        font-size: 28px;
        font-weight: 600;
        color: #1989fa;
        margin: 0;
      }
    }
    
    .slogan {
      font-size: 16px;
      color: #666;
      margin: 0;
    }
  }
  
  .form-container {
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
    :deep(.van-tabs__wrap) {
      margin-bottom: 16px;
    }
    
    .form-links {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      font-size: 14px;
      
      .forgot-link {
        color: #1989fa;
      }
    }
    
    .agreement {
      padding: 16px;
      font-size: 14px;
      
      .link {
        color: #1989fa;
      }
    }
    
    .form-actions {
      padding: 16px;
    }
  }
  
  .third-party-login {
    margin-top: auto;
    padding: 16px;
    text-align: center;
    
    p {
      font-size: 14px;
      color: #666;
      margin-bottom: 16px;
      position: relative;
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 30%;
        height: 1px;
        background-color: #ddd;
      }
      
      &::before {
        left: 0;
      }
      
      &::after {
        right: 0;
      }
    }
    
    .third-party-icons {
      display: flex;
      justify-content: center;
      gap: 40px;
      
      .van-icon {
        background-color: #fff;
        padding: 12px;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
  
  .popup-title {
    text-align: center;
    padding: 16px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #eee;
  }
}
</style>
