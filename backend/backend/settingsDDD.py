
from datetime import timedelta
import os
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure--&#ee_y4sd-72-izs%*gh+7l=8=$u#r+neom16wy3rlwk@-tt&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']
AUTH_USER_MODEL = 'journal.user'



# Email
# Local email configurations
# EMAIL_USE_SSL = True
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 465
# EMAIL_USE_TLS = False
# EMAIL_HOST_USER = 'appskelvin5@gmail.com'
# EMAIL_HOST_PASSWORD ='nekunvsnjsniqupu'

# Production email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.nairobidevops.org' 
EMAIL_HOST_USER = 'noreply@nairobidevops.org'
DEFAULT_FROM_EMAIL = "nairobidevops.org"
EMAIL_HOST_PASSWORD = 'MbK&5^PXxnF4' 
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_USE_TLS = False


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'journal',
    'rest_framework',
    'rest_framework_simplejwt',

    # 'rest_framework.authtoken',
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny', 
        )
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [],
        'DIRS': [os.path.join(BASE_DIR / 'client/dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI_APPLICATION = 'backend.wsgi.application'
ASGI_APPLICATION = 'backend.asgi.application'


CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
        # "CONFIG": {
        #     "hosts": [("127.0.0.1", 6379)],
        # },
    },
}

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'marketp8_marketplaceke',
#         'HOST':'localhost',
#         'USER':'marketp8_triplek',
#         'PASSWORD': 'l*nE47MVuY(4',
#         }
# }

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Africa/Nairobi'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/


# development
STATIC_URL = '/assets/'
STATIC_ROOT = os.path.join(BASE_DIR / 'assets')
STATICFILES_DIRS = (os.path.join(BASE_DIR / 'client/dist/assets')),

MEDIA_URL = '/files/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'files/')

# production
# STATIC_URL = '/assets/'
# STATIC_ROOT =  '/home/ltobrand/public_html/assets'

# MEDIA_URL = '/files/'
# MEDIA_ROOT = '/home/ltobrand/public_html/api/files/'



# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
