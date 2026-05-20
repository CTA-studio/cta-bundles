window.AppForms = window.AppForms || {
  actionUrl:
    "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/registerUser",

  init: function () {
    if (!window.pageSpecificListeners) {
      window.pageSpecificListeners = [];
    }

    this.handleForms();

    window.pageSpecificListeners.push({
      cleanup: () => {
        window.FormSubmitLock?.unlock?.();
        window.FormSubmitOverlay?.hide?.();
        window.isFormSubmitting = false;
      },
    });
  },

  handleForms: function () {
    const self = this;

    jQuery('form[action*="registerUser"]').each(function (_, el) {
      const form = jQuery(el)[0];

      form.removeAttribute("action");
      form.removeAttribute("method");

      const submitHandler = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (window.isFormSubmitting) return;
        window.isFormSubmitting = true;

        const data = self.convertFormToJSON(form);

        window.FormSubmitOverlay?.show?.();
        window.FormSubmitLock?.lock?.();

        jQuery.ajax({
          url: self.actionUrl,
          method: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",

          success: function (response) {
            if (response?.success) {
              console.log("✅ Registrazione avvenuta con successo!");
              jQuery(form).hide();
              jQuery(form).parent().children(".w-form-done").fadeIn();
            } else {
              console.warn("❌ Errore di registrazione:", response?.error);
              jQuery(form)
                .parent()
                .children(".w-form-fail")
                .fadeIn()
                .text(response?.error || "Errore durante la registrazione.");
            }
          },

          error: function (jqXHR, textStatus, errorThrown) {
            console.error(
              "❌ Errore registrazione:",
              textStatus,
              errorThrown,
              jqXHR.responseText,
            );

            jQuery(form)
              .parent()
              .children(".w-form-fail")
              .fadeIn()
              .text("Errore durante la registrazione. Riprova.");
          },

          complete: function () {
            window.FormSubmitLock?.unlock?.();
            window.FormSubmitOverlay?.hide?.();
            window.isFormSubmitting = false;
          },
        });
      };

      form.addEventListener("submit", submitHandler);

      window.pageSpecificListeners.push({
        element: form,
        event: "submit",
        handler: submitHandler,
      });
    });
  },

  convertFormToJSON: function (form) {
    const array = jQuery(form).serializeArray();
    const json = {};

    jQuery.each(array, function () {
      json[this.name] = this.value || "";
    });

    return json;
  },
};

window.AppResetPassword = window.AppResetPassword || {
  actionUrl:
    "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/sendPasswordResetEmail",

  init: function () {
    console.log("🔑 Inizializzazione AppResetPassword...");

    if (!window.pageSpecificListeners) {
      window.pageSpecificListeners = [];
    }

    this.handleForms();

    window.pageSpecificListeners.push({
      cleanup: () => {
        window.FormSubmitLock?.unlock?.();
        window.FormSubmitOverlay?.hide?.();
        window.isFormSubmitting = false;
      },
    });
  },

  handleForms: function () {
    const self = this;

    jQuery('form[action*="sendPasswordResetEmail"]').each(function (_, el) {
      const form = jQuery(el)[0];

      form.removeAttribute("action");
      form.removeAttribute("method");

      const submitHandler = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (window.isFormSubmitting) return;
        window.isFormSubmitting = true;

        const data = self.convertFormToJSON(form);

        window.FormSubmitOverlay?.show?.();
        window.FormSubmitLock?.lock?.();

        jQuery.ajax({
          url: self.actionUrl,
          method: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",

          success: function (response) {
            if (response?.success) {
              console.log("✅ Email di reset inviata con successo!");
              jQuery(form).hide();
              jQuery(form).parent().children(".w-form-done").fadeIn();
            } else {
              console.warn(
                "❌ Errore nell'invio della richiesta:",
                response?.error,
              );
              jQuery(form)
                .parent()
                .children(".w-form-fail")
                .fadeIn()
                .text(
                  response?.error || "Errore durante l'invio della richiesta.",
                );
            }
          },

          error: function (jqXHR, textStatus, errorThrown) {
            console.error(
              "❌ Errore richiesta reset password:",
              textStatus,
              errorThrown,
              jqXHR.responseText,
            );
            jQuery(form)
              .parent()
              .children(".w-form-fail")
              .fadeIn()
              .text("Errore durante l'invio della richiesta. Riprova.");
          },

          complete: function () {
            window.FormSubmitLock?.unlock?.();
            window.FormSubmitOverlay?.hide?.();
            window.isFormSubmitting = false;
          },
        });
      };

      form.addEventListener("submit", submitHandler);
      window.pageSpecificListeners.push({
        element: form,
        event: "submit",
        handler: submitHandler,
      });
    });
  },

  convertFormToJSON: function (form) {
    const array = jQuery(form).serializeArray();
    const json = {};
    jQuery.each(array, function () {
      json[this.name] = this.value || "";
    });
    return json;
  },
};

window.AppUpdatePassword = window.AppUpdatePassword || {
  actionUrl:
    "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/updatePassword",

  init: function () {
    console.log("🔑 Inizializzazione AppUpdatePassword...");

    if (!window.pageSpecificListeners) {
      window.pageSpecificListeners = [];
    }

    this.handleForms();

    window.pageSpecificListeners.push({
      cleanup: () => {
        window.FormSubmitLock?.unlock?.();
        window.FormSubmitOverlay?.hide?.();
        window.isFormSubmitting = false;
      },
    });
  },

  handleForms: function () {
    const self = this;

    jQuery('form[action*="updatePassword"]').each(function (_, el) {
      const form = jQuery(el)[0];

      form.removeAttribute("action");
      form.removeAttribute("method");

      const urlParams = new URLSearchParams(window.location.search);
      let token = urlParams.get("token");
      let email = urlParams.get("email");

      if (!token || !email) {
        console.error("❌ Errore: Token o email non trovati nell'URL.");
        jQuery(form)
          .parent()
          .children(".w-form-fail")
          .fadeIn()
          .text("Errore: Link non valido o scaduto.");
        return;
      }

      token = decodeURIComponent(token).trim();
      email = decodeURIComponent(email).trim();

      const submitHandler = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (window.isFormSubmitting) return;
        window.isFormSubmitting = true;

        const data = self.convertFormToJSON(form);
        data.token = token;
        data.email = email;
        data.newPassword = data.password;
        delete data.password;

        window.FormSubmitOverlay?.show?.();
        window.FormSubmitLock?.lock?.();

        jQuery.ajax({
          url: self.actionUrl,
          method: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",

          success: function (response) {
            if (response?.success) {
              console.log("✅ Password aggiornata con successo!");
              jQuery(form).hide();
              jQuery(form).parent().children(".w-form-done").fadeIn();
            } else {
              console.warn(
                "❌ Errore nell'aggiornamento della password:",
                response?.error,
              );
              jQuery(form)
                .parent()
                .children(".w-form-fail")
                .fadeIn()
                .text(
                  response?.error ||
                    "Errore durante l'aggiornamento della password.",
                );
            }
          },

          error: function (jqXHR, textStatus, errorThrown) {
            console.error(
              "❌ Errore nell'aggiornamento della password:",
              textStatus,
              errorThrown,
              jqXHR.responseText,
            );
            jQuery(form)
              .parent()
              .children(".w-form-fail")
              .fadeIn()
              .text("Errore durante l'aggiornamento della password. Riprova.");
          },

          complete: function () {
            window.FormSubmitLock?.unlock?.();
            window.FormSubmitOverlay?.hide?.();
            window.isFormSubmitting = false;
          },
        });
      };

      form.addEventListener("submit", submitHandler);
      window.pageSpecificListeners.push({
        element: form,
        event: "submit",
        handler: submitHandler,
      });
    });
  },

  convertFormToJSON: function (form) {
    const array = jQuery(form).serializeArray();
    const json = {};
    jQuery.each(array, function () {
      json[this.name] = this.value || "";
    });
    return json;
  },
};

window.AppAssessmentForms = window.AppAssessmentForms || {
  actionUrl:
    "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/webhook",

  init: function () {
    if (!window.pageSpecificListeners) {
      window.pageSpecificListeners = [];
    }

    this.handleForms();

    window.pageSpecificListeners.push({
      cleanup: () => {
        window.FormSubmitLock?.unlock?.();
        window.FormSubmitOverlay?.hide?.();
        window.isFormSubmitting = false;
      },
    });
  },

  handleForms: function () {
    const self = this;

    jQuery(`form[action="${this.actionUrl}"]`).each(function (_, el) {
      const form = jQuery(el)[0];

      form.removeAttribute("action");
      form.removeAttribute("method");

      const submitHandler = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (window.isFormSubmitting) return;
        window.isFormSubmitting = true;

        const user = firebase.auth().currentUser;
        const userId = user ? user.uid : null;

        const data = self.convertFormToJSON(form);
        data.formId = form.id || "unknown-form";
        data.uid = userId;

        window.FormSubmitOverlay?.show?.();
        window.FormSubmitLock?.lock?.();

        jQuery.ajax({
          url: self.actionUrl,
          method: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",

          success: function (response) {
            console.log("✅ Invio assessment avvenuto con successo:", response);
            jQuery(form).hide();
            jQuery(form).parent().children(".w-form-done").fadeIn();
          },

          error: function (jqXHR, textStatus, errorThrown) {
            console.error(
              "❌ Errore invio assessment:",
              textStatus,
              errorThrown,
              jqXHR.responseText,
            );
            jQuery(form).parent().children(".w-form-fail").fadeIn();
          },

          complete: function () {
            window.FormSubmitLock?.unlock?.();
            window.FormSubmitOverlay?.hide?.();
            window.isFormSubmitting = false;
          },
        });
      };

      form.addEventListener("submit", submitHandler);
      window.pageSpecificListeners.push({
        element: form,
        event: "submit",
        handler: submitHandler,
      });
    });
  },

  convertFormToJSON: function (form) {
    const array = jQuery(form).serializeArray();
    const json = {};

    jQuery.each(array, function () {
      json[this.name] = this.value || "";
    });

    return json;
  },
};

window.AppPasswordToggle = window.AppPasswordToggle || {
  init: function (passwordFieldId = "password") {
    const passwordField = document.getElementById(passwordFieldId);
    const eyeButton = document.getElementById("eye-button");
    const eyeOpen = document.getElementById("pass-eye");
    const eyeClosed = document.getElementById("pass-eye-none");

    if (!passwordField || !eyeButton || !eyeOpen || !eyeClosed) {
      console.warn("⚠️ Elementi per il toggle password non trovati.");
      return;
    }

    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";

    const togglePasswordHandler = function () {
      const isPassword = passwordField.type === "password";

      passwordField.type = isPassword ? "text" : "password";
      eyeClosed.style.display = isPassword ? "none" : "block";
      eyeOpen.style.display = isPassword ? "block" : "none";
    };

    eyeButton.addEventListener("click", togglePasswordHandler);

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    window.pageSpecificListeners.push({
      element: eyeButton,
      event: "click",
      handler: togglePasswordHandler,
    });
  },
};
/** Form richiesta appuntamenti/proposito generale webhook */
window.AppGeneralForms = window.AppGeneralForms || {
  actionUrl:
    "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/webhook",

  init: function () {
    console.log("📝 Inizializzazione CTA AppGeneralForm...");

    if (!window.pageSpecificListeners) {
      window.pageSpecificListeners = [];
    }

    this.handleForms();

    window.pageSpecificListeners.push({
      cleanup: () => {
        window.FormSubmitLock?.unlock?.();
        window.FormSubmitOverlay?.hide?.();
        window.isFormSubmitting = false;
      },
    });
  },

  handleForms: function () {
    const self = this;

    jQuery(`form[action="${this.actionUrl}"]`).each(function (_, el) {
      const form = jQuery(el)[0];

      form.removeAttribute("action");
      form.removeAttribute("method");

      const submitHandler = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (window.isFormSubmitting) return;
        window.isFormSubmitting = true;

        const data = self.convertFormToJSON(form);
        data.formId = form.id || "unknown-form";

        window.FormSubmitLock?.lock?.();
        window.FormSubmitOverlay?.show?.();

        jQuery.ajax({
          url: self.actionUrl,
          method: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",

          success: function (response) {
            console.log("Invio form avvenuto con successo:", response);

            const isSuccess = response && response.success === true;
            const isContactForm = data.formId === "wf-form-Progetto";

            if (isSuccess && isContactForm) {
              window.dataLayer = window.dataLayer || [];

              window.dataLayer.push({
                event: "form_submit_contact",
                form_name: data.formId,
                form_location: window.location.pathname,
                page_path: window.location.pathname,
                page_url: window.location.href,
                page_title: document.title,
              });

              console.log(
                "📊 Evento GA4 form_submit_contact inviato a dataLayer",
                {
                  form_name: data.formId,
                  page_path: window.location.pathname,
                },
              );
            }

            jQuery(form).hide();
            jQuery(form).parent().children(".w-form-done").fadeIn();
          },

          error: function (jqXHR, textStatus, errorThrown) {
            console.error(
              "❌ Errore invio form:",
              textStatus,
              errorThrown,
              jqXHR.responseText,
            );
            jQuery(form).parent().children(".w-form-fail").fadeIn();
          },

          complete: function () {
            window.FormSubmitLock?.unlock?.();
            window.FormSubmitOverlay?.hide?.();
            window.isFormSubmitting = false;
          },
        });
      };

      form.addEventListener("submit", submitHandler);

      window.pageSpecificListeners.push({
        element: form,
        event: "submit",
        handler: submitHandler,
      });
    });
  },

  convertFormToJSON: function (form) {
    const array = jQuery(form).serializeArray();
    const json = {};

    jQuery.each(array, function () {
      json[this.name] = this.value || "";
    });

    return json;
  },
};

/** Freeze ui */
window.FormSubmitLock =
  window.FormSubmitLock ||
  (() => {
    let keyBlocker = null;
    let mouseBlocker = null;
    let isLocked = false;

    function getOverlay() {
      return document.querySelector("[data-form-loading-overlay]");
    }

    function shouldForceScrollTop() {
      const overlay = getOverlay();
      if (!overlay) return true;
      return !overlay.hasAttribute("data-no-scroll-top");
    }

    function enableKeyBlock() {
      if (keyBlocker) return;

      keyBlocker = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };

      window.addEventListener("keydown", keyBlocker, true);
      window.addEventListener("keypress", keyBlocker, true);
      window.addEventListener("keyup", keyBlocker, true);
    }

    function disableKeyBlock() {
      if (!keyBlocker) return;

      window.removeEventListener("keydown", keyBlocker, true);
      window.removeEventListener("keypress", keyBlocker, true);
      window.removeEventListener("keyup", keyBlocker, true);
      keyBlocker = null;
    }

    function enableMouseBlock() {
      if (mouseBlocker) return;

      mouseBlocker = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };

      window.addEventListener("click", mouseBlocker, true);
      window.addEventListener("mousedown", mouseBlocker, true);
      window.addEventListener("mouseup", mouseBlocker, true);
      window.addEventListener("pointerdown", mouseBlocker, true);
      window.addEventListener("pointerup", mouseBlocker, true);
      window.addEventListener("touchstart", mouseBlocker, true);
      window.addEventListener("touchend", mouseBlocker, true);
    }

    function disableMouseBlock() {
      if (!mouseBlocker) return;

      window.removeEventListener("click", mouseBlocker, true);
      window.removeEventListener("mousedown", mouseBlocker, true);
      window.removeEventListener("mouseup", mouseBlocker, true);
      window.removeEventListener("pointerdown", mouseBlocker, true);
      window.removeEventListener("pointerup", mouseBlocker, true);
      window.removeEventListener("touchstart", mouseBlocker, true);
      window.removeEventListener("touchend", mouseBlocker, true);
      mouseBlocker = null;
    }

    function forceScrollTop() {
      try {
        window.lenisInstance?.forceScrollToTop?.();
      } catch (err) {
        console.warn("FormSubmitLock: errore forceScrollToTop", err);
      }
    }

    function stopLenis() {
      try {
        window.lenisInstance?.stop?.();
      } catch (err) {
        console.warn("FormSubmitLock: errore stop Lenis", err);
      }
    }

    function startLenis() {
      try {
        window.lenisInstance?.start?.();
      } catch (err) {
        console.warn("FormSubmitLock: errore start Lenis", err);
      }
    }

    function disableHeaderUi() {
      window.headerAnimation?.disableBurgerClick?.();
      window.headerAnimation?.disableBackHomeLink?.();
    }

    function enableHeaderUi() {
      window.headerAnimation?.enableBurgerClick?.();
      window.headerAnimation?.enableBackHomeLink?.();
    }

    function lock() {
      if (isLocked) return;
      isLocked = true;

      if (shouldForceScrollTop()) {
        forceScrollTop();
      }

      stopLenis();
      enableKeyBlock();
      enableMouseBlock();
      disableHeaderUi();
    }

    function unlock() {
      if (!isLocked) return;
      isLocked = false;

      disableKeyBlock();
      disableMouseBlock();
      startLenis();
      enableHeaderUi();
    }

    return {
      lock,
      unlock,
      get isLocked() {
        return isLocked;
      },
    };
  })();
/** Animazione Overlay Attesa */
window.FormSubmitOverlay =
  window.FormSubmitOverlay ||
  (() => {
    let logoTween = null;

    function getEl() {
      return document.querySelector("[data-form-loading-overlay]");
    }

    function getLogo() {
      return document.querySelector(".img-loading-overlay");
    }

    function startAnimation() {
      const logo = getLogo();
      if (!logo || !window.gsap) return;

      logoTween?.kill();

      gsap.set(logo, { scale: 0.9 });

      logoTween = gsap.to(logo, {
        scale: 1,
        duration: 0.9,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    function stopAnimation() {
      const logo = getLogo();

      if (logoTween) {
        logoTween.kill();
        logoTween = null;
      }

      if (logo && window.gsap) {
        gsap.set(logo, { scale: 1 });
      }
    }

    function show() {
      const el = getEl();
      if (!el) return;

      el.classList.add("is-active");
      el.setAttribute("aria-hidden", "false");
      startAnimation();
    }

    function hide() {
      const el = getEl();
      if (!el) return;

      el.classList.remove("is-active");
      el.setAttribute("aria-hidden", "true");
      stopAnimation();
    }

    return {
      show,
      hide,
      startAnimation,
      stopAnimation,
    };
  })();
/** Form Multistep e Calendar */
window.MultiStepForm =
  window.MultiStepForm ||
  (() => {
    let formElement, steps, currentStepIndex, progressElement;

    function init() {
      formElement = document.querySelector("[data-form='multistep']");
      if (!formElement) {
        console.error("Form multi-step non trovato.");
        return;
      }
      steps = Array.from(formElement.querySelectorAll("[data-form='step']"));
      if (steps.length === 0) {
        console.error("Nessuno step trovato nel form.");
        return;
      }

      progressElement = formElement.querySelector("[data-form='progress']");
      currentStepIndex = 0;

      steps.forEach((step) => {
        updateStepButtonState(step);
      });

      setupEvents();
      setupEnterKey();
      updateStep();
    }

    function setupEvents() {
      const nextButtons = formElement.querySelectorAll(
        "[data-form='next-btn']",
      );
      const backButtons = formElement.querySelectorAll(
        "[data-form='back-btn']",
      );
      const submitButton = formElement.querySelector(
        "[data-form='submit-btn']",
      );

      nextButtons.forEach((button) => {
        button.disabled = true;
        button.addEventListener("click", (e) => {
          e.preventDefault();
          if (validateStep()) nextStep();
        });
      });

      backButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          prevStep();
        });
      });

      if (submitButton) {
        submitButton.addEventListener("click", (e) => {
          if (!validateStep()) e.preventDefault();
        });
      }

      steps.forEach((step) => {
        setupStepValidation(step);
        step.addEventListener("change", () => {
          updateStepButtonState(step);
        });
      });
    }

    function setupStepValidation(step) {
      // Gestione checkbox
      const requiredCheckboxes = step.querySelectorAll("[data-checkbox]");
      if (requiredCheckboxes.length > 0) {
        requiredCheckboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            updateStepButtonState(step);
          });
        });
      }

      // Gestione input richiesti
      const requiredInputs = step.querySelectorAll("input[required]");
      if (requiredInputs.length > 0) {
        requiredInputs.forEach((input) => {
          ["input", "change"].forEach((eventType) => {
            input.addEventListener(eventType, () => {
              updateStepButtonState(step);
            });
          });
        });

        // ✅ Esegui una verifica ritardata solo una volta per tutti gli input
        setTimeout(() => {
          updateStepButtonState(step);
        }, 300);
      }

      // Gestione radio button con avanzamento automatico
      const radioInputs = step.querySelectorAll("[data-radio-skip='true']");
      if (radioInputs.length > 0) {
        radioInputs.forEach((radio) => {
          radio.addEventListener("change", () => {
            setTimeout(
              () => {
                nextStep();
              },
              parseInt(radio.dataset.radioDelay || "0", 10),
            );
          });
        });
      }

      if (step.hasAttribute("data-contact-step")) {
        setupContactStep(step);
      }

      // Gestione password
      setupPasswordValidation(step);
      setupPhoneAutoFormat(step);
      updateStepButtonState(step);
    }

    function setupEnterKey() {
      if (formElement.hasAttribute("data-enter")) {
        formElement.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && currentStepIndex < steps.length - 1) {
            e.preventDefault();
            if (validateStep()) nextStep();
          }
        });
      }
    }

    function setupPhoneAutoFormat(step) {
      const phoneInputs = step.querySelectorAll("input[data-phone-autoformat]");

      if (phoneInputs.length > 0) {
        phoneInputs.forEach((input) => {
          const maxLength = parseInt(
            input.getAttribute("data-phone-autoformat"),
            10,
          );

          input.addEventListener("input", () => {
            let value = input.value.replace(/[^0-9]/g, "");
            if (value.length > maxLength) {
              value = value.slice(0, maxLength);
            }
            input.value = value;
          });
        });
      }
    }

    function setupPasswordValidation(step) {
      const passwordFields = step.querySelectorAll("input[data-password]");

      passwordFields.forEach((input) => {
        const minLength = parseInt(input.getAttribute("data-password"), 10);
        const errorDiv = document.getElementById("error-pass-input"); // Seleziona direttamente il div con ID specifico

        if (!errorDiv) {
          return;
        }

        input.addEventListener("input", () => {
          if (input.value.length >= minLength) {
            errorDiv.style.display = "none"; //  Nasconde l'errore
          } else {
            errorDiv.style.display = "block"; //  Mostra l'errore
            errorDiv.textContent = `La password deve contenere almeno ${minLength} caratteri.`;
          }
          updateStepButtonState(step);
        });
      });
    }

    function validateStep() {
      const currentStep = steps[currentStepIndex];
      if (!currentStep) return false;

      let isValid = true;

      const requiredInputs = currentStep.querySelectorAll(
        "input[required], textarea[required], select[required]",
      );

      requiredInputs.forEach((input) => {
        const type = input.type;

        if (type === "checkbox") {
          if (!input.checked) isValid = false;
          return;
        }

        if (type === "radio") {
          const group = currentStep.querySelectorAll(
            `input[type="radio"][name="${input.name}"]`,
          );
          const oneChecked = Array.from(group).some((radio) => radio.checked);
          if (!oneChecked) isValid = false;
          return;
        }

        if (!input.value || !input.value.trim()) {
          isValid = false;
        }
      });

      const requiredCheckboxes = currentStep.querySelectorAll(
        "input[type='checkbox'][data-checkbox]",
      );

      if (requiredCheckboxes.length > 0) {
        const requiredCount =
          parseInt(currentStep.getAttribute("data-checkbox"), 10) || 0;
        const checkedCount = Array.from(requiredCheckboxes).filter(
          (checkbox) => checkbox.checked,
        ).length;

        if (checkedCount < requiredCount) isValid = false;
      }

      return isValid;
    }

    function updateStepButtonState(step) {
      const actionButton = step.querySelector(
        "[data-form='next-btn'], [data-form='submit-btn']",
      );

      if (!actionButton) return;

      let isValid = true;

      const requiredInputs = step.querySelectorAll(
        "input[required], textarea[required], select[required]",
      );

      requiredInputs.forEach((input) => {
        const type = input.type;

        if (type === "checkbox") {
          if (!input.checked) isValid = false;
          return;
        }

        if (type === "radio") {
          const group = step.querySelectorAll(
            `input[type="radio"][name="${input.name}"]`,
          );
          const oneChecked = Array.from(group).some((radio) => radio.checked);
          if (!oneChecked) isValid = false;
          return;
        }

        if (!input.value || !input.value.trim()) {
          isValid = false;
        }
      });

      const requiredCheckboxes = step.querySelectorAll(
        "input[type='checkbox'][data-checkbox]",
      );
      if (requiredCheckboxes.length > 0) {
        const requiredCount =
          parseInt(step.getAttribute("data-checkbox"), 10) || 0;
        const checkedCount = Array.from(requiredCheckboxes).filter(
          (checkbox) => checkbox.checked,
        ).length;

        if (checkedCount < requiredCount) isValid = false;
      }

      actionButton.disabled = !isValid;
      actionButton.style.pointerEvents = isValid ? "auto" : "none";
      actionButton.style.opacity = isValid ? "1" : "0.6";
    }

    function scrollFormToTop() {
      const activeStep = steps?.[currentStepIndex];
      const localScrollBox = activeStep?.querySelector(".form_modal");

      if (localScrollBox) {
        localScrollBox.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
        return;
      }

      if (window.lenisInstance?.scrollTo) {
        window.lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }

    function updateProgress(formElement) {
      if (!formElement) {
        return;
      }

      // ✅ Seleziona gli indicatori personalizzati
      const customIndicators = formElement.querySelectorAll(
        "[data-form='custom-progress-indicator']",
      );

      if (customIndicators.length === 0) {
        return;
      }

      customIndicators.forEach((indicator, index) => {
        indicator.classList.toggle("current", index === currentStepIndex);
      });
    }

    function updateProgressBar(formElement) {
      if (!formElement) {
        return;
      }

      // ✅ Controlla se il form ha una progress bar
      const progressContainer = formElement.querySelector(
        "[data-form='progress']",
      );
      const progressIndicator = formElement.querySelector(
        "[data-form='progress-indicator']",
      );
      const progressTextElements = formElement.querySelectorAll(
        "[data-form='progress-percent']",
      );

      if (!progressContainer || !progressIndicator) {
        return;
      }

      const totalSteps = steps.length;
      const progressPercentage = Math.round(
        ((currentStepIndex + 1) / totalSteps) * 100,
      );

      // ✅ Aggiorna la barra di avanzamento (se esiste)
      progressIndicator.style.width = `${progressPercentage}%`;

      // ✅ Aggiorna il testo della percentuale (se esiste)
      progressTextElements.forEach((element) => {
        element.textContent = `${progressPercentage}`;
      });
    }

    function nextStep() {
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        updateStep();
      }
    }

    function prevStep() {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        updateStep();
      }
    }

    function updateStep() {
      scrollFormToTop();

      steps.forEach((step, index) => {
        if (index === currentStepIndex) {
          gsap.set(step, { display: "flex" });
          gsap.to(step, { opacity: 1, duration: 0.35, ease: "power2.out" });
        } else {
          gsap.set(step, { display: "none", opacity: 0 });
        }
      });

      if (formElement) {
        updateProgress(formElement);
        updateProgressBar(formElement);
      }
    }

    function setupContactStep(step) {
      const radios = step.querySelectorAll("input[name='contact-preference']");
      const calendarSection = step.querySelector("[data-calendar-section]");
      const changeDateBtn = step.querySelector("[data-calendar-change]");
      const dateInput = formElement?.querySelector("input[name='data']");

      if (!radios.length) return;

      function refresh() {
        const selected = step.querySelector(
          "input[name='contact-preference']:checked",
        )?.value;

        step.classList.toggle("is-call-selected", selected === "call");

        if (!selected) {
          if (calendarSection) calendarSection.style.display = "none";
          closeCalendarOverlay();

          if (dateInput) {
            dateInput.required = false;
            dateInput.value = "";
          }

          updateStepButtonState(step);
          return;
        }

        if (selected === "call") {
          if (dateInput) dateInput.required = true;

          const hasDate = !!dateInput?.value?.trim();

          if (!hasDate) {
            if (calendarSection) calendarSection.style.display = "none";
            openCalendarOverlay(() => {
              if (calendarSection) calendarSection.style.display = "flex";
            });
          } else {
            if (calendarSection) calendarSection.style.display = "flex";
          }

          updateStepButtonState(step);
          return;
        }

        if (calendarSection) calendarSection.style.display = "none";
        closeCalendarOverlay();

        if (dateInput) {
          dateInput.required = false;
          dateInput.value = "";
        }

        updateStepButtonState(step);
      }

      radios.forEach((radio) => {
        radio.addEventListener("change", refresh);
      });

      if (dateInput) {
        dateInput.addEventListener("input", refresh);
        dateInput.addEventListener("change", refresh);
      }

      if (changeDateBtn) {
        changeDateBtn.addEventListener("click", (e) => {
          e.preventDefault();
          openCalendarOverlay();
        });
      }

      refresh();
    }

    function openCalendarOverlay(onComplete) {
      const calendarOverlay = document.querySelector(".calendar-overlay");
      if (!calendarOverlay || !window.gsap) return;

      gsap.killTweensOf(calendarOverlay);

      calendarOverlay.classList.add("is-active");

      gsap.set(calendarOverlay, {
        "--cal-clip-top": "0%",
        "--cal-clip-bottom": "100%",
      });

      gsap.to(calendarOverlay, {
        "--cal-clip-bottom": "0%",
        duration: 1,
        ease: "power3.inOut",
        onComplete,
      });
    }

    function closeCalendarOverlay(onComplete) {
      const calendarOverlay = document.querySelector(".calendar-overlay");
      if (!calendarOverlay || !window.gsap) return;

      gsap.killTweensOf(calendarOverlay);

      gsap.to(calendarOverlay, {
        "--cal-clip-top": "100%",
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          calendarOverlay.classList.remove("is-active");

          gsap.set(calendarOverlay, {
            "--cal-clip-top": "0%",
            "--cal-clip-bottom": "100%",
          });

          onComplete?.();
        },
      });
    }

    function reset() {
      if (!formElement) return;

      formElement.reset();
      currentStepIndex = 0;

      const contactRadios = formElement.querySelectorAll(
        "input[name='contact-preference']",
      );

      contactRadios.forEach((radio) => {
        radio.checked = false;

        const radioField = radio.closest(".w-radio");
        const customRadio = radioField?.querySelector(".w-radio-input");
        customRadio?.classList.remove("w--redirected-checked");
      });

      const finalCheckboxes = formElement.querySelectorAll(
        "[data-contact-step] input[type='checkbox']",
      );

      finalCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;

        const checkboxField = checkbox.closest(".w-checkbox");
        const customCheckbox =
          checkboxField?.querySelector(".w-checkbox-input");
        customCheckbox?.classList.remove("w--redirected-checked");
      });

      steps.forEach((step) => {
        step.classList.remove("is-call-selected");

        const calendarSection = step.querySelector("[data-calendar-section]");
        if (calendarSection) {
          calendarSection.style.display = "none";
        }

        updateStepButtonState(step);
      });

      updateStep();

      const modalScrollBox = document.querySelector(".form_modal");
      if (modalScrollBox) {
        modalScrollBox.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      }
    }

    return { init, reset, openCalendarOverlay, closeCalendarOverlay };
  })();

function calendar() {
  if (!window.gsap) {
    console.warn("calendar: gsap non disponibile");
    return;
  }

  const { gsap } = window;
  const inputFields = document.querySelectorAll(".form-text-field-2");
  const calendarModal = document.getElementById("calendar-modal");
  const timeSelectionModal = document.getElementById("time-selection-modal");
  const timeSelectionEl = document.getElementById("time-selection");
  const calendarEl = document.getElementById("calendar");

  const calSteps = Array.from(document.querySelectorAll("[data-cal-step]"));
  const dateStep = document.querySelector('[data-cal-step="date"]');
  const timeStep = document.querySelector('[data-cal-step="time"]');
  const selectedDayLabel = document.querySelector(
    "[data-calendar-selected-day]",
  );
  const backBtn = document.querySelector("[data-calendar-back]");

  let currentInputField;
  let currentCalStep = "date";
  let selectedDate = null;

  if (!calendarEl || calendarEl.dataset.initialized) {
    console.warn("Il calendario è già stato inizializzato o non esiste.");
    return;
  }

  calendarEl.dataset.initialized = "true";
  calendarModal?.offsetHeight;

  function updateCalStep(stepName) {
    currentCalStep = stepName;

    const isDate = stepName === "date";
    const isTime = stepName === "time";

    if (dateStep) {
      dateStep.style.pointerEvents = isDate ? "auto" : "none";
      gsap.to(dateStep, {
        opacity: isDate ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (timeStep) {
      timeStep.style.pointerEvents = isTime ? "auto" : "none";
      gsap.to(timeStep, {
        opacity: isTime ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    scrollCalendarToTop();

    if (isDate) {
      requestAnimationFrame(() => {
        calendar.updateSize();
        applySelectedDayStyling();
      });
    }
  }

  function formatDateForComparison(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatSelectedDayLabel(date) {
    const formatted = new Intl.DateTimeFormat("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    return `Hai scelto ${formatted}`;
  }

  function applyOccupiedDaysStyling() {
    calendar.el.querySelectorAll(".occupied-day").forEach((el) => {
      el.classList.remove("occupied-day");
      el.style = "";
    });

    const events = calendar.getEvents();
    const occupiedDays = new Map();
    const allDayOccupiedDays = new Set();

    events.forEach((event) => {
      if (!event.start || !event.end) return;

      const isAllDay =
        event.allDay ||
        (event.start.getHours() === 0 &&
          event.start.getMinutes() === 0 &&
          event.end.getHours() === 0 &&
          event.end.getMinutes() === 0) ||
        event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000;

      const dateKey = formatDateForComparison(event.start);

      if (isAllDay) {
        allDayOccupiedDays.add(dateKey);
      } else {
        if (!occupiedDays.has(dateKey)) occupiedDays.set(dateKey, []);
        occupiedDays.get(dateKey).push({
          start: event.start.getHours() * 60 + event.start.getMinutes(),
          end: event.end.getHours() * 60 + event.end.getMinutes(),
        });
      }
    });

    allDayOccupiedDays.forEach((dateKey) => {
      const el = calendar.el.querySelector(`[data-date="${dateKey}"]`);
      if (el) {
        el.classList.add("occupied-day");
        el.style.pointerEvents = "none";
        el.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
        el.style.opacity = "0.6";
        el.style.textDecoration = "line-through";
      }
    });

    occupiedDays.forEach((slots, dateKey) => {
      if (allDayOccupiedDays.has(dateKey)) return;
      if (isDayCompletelyOccupiedByEvents(slots)) {
        const el = calendar.el.querySelector(`[data-date="${dateKey}"]`);
        if (el) {
          el.classList.add("occupied-day");
          el.style.pointerEvents = "none";
          el.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
          el.style.opacity = "0.6";
          el.style.textDecoration = "line-through";
        }
      }
    });
  }

  function isDayCompletelyOccupiedByEvents(events) {
    const workStart = 10 * 60;
    const workEnd = 20 * 60;
    events.sort((a, b) => a.start - b.start);
    let lastEnd = workStart;

    for (const e of events) {
      if (e.start <= lastEnd) {
        lastEnd = Math.max(lastEnd, e.end);
      } else {
        return false;
      }
    }

    return lastEnd - workStart >= workEnd - workStart;
  }

  function isTimeSlotOccupied(dateTime) {
    return calendar.getEvents().some((e) => {
      if (!e.start || !e.end) return false;
      return dateTime >= e.start && dateTime < e.end;
    });
  }

  function isDayCompletelyOccupied(date) {
    const events = calendar.getEvents();
    const dateKey = formatDateForComparison(date);

    const hasAllDay = events.some((event) => {
      if (!event.start || !event.end) return false;

      const eventDateKey = formatDateForComparison(event.start);
      if (eventDateKey !== dateKey) return false;

      const isAllDay =
        event.allDay ||
        (event.start.getHours() === 0 &&
          event.start.getMinutes() === 0 &&
          event.end.getHours() === 0 &&
          event.end.getMinutes() === 0) ||
        event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000;

      return isAllDay;
    });

    if (hasAllDay) return true;

    const slots = [];
    for (let hour = 10; hour <= 19; hour++) {
      slots.push({ hour, minute: 0 }, { hour, minute: 30 });
    }
    slots.push({ hour: 20, minute: 0 });

    let available = 0;

    slots.forEach((t) => {
      const dt = new Date(date);
      dt.setHours(t.hour, t.minute, 0, 0);
      if (!isTimeSlotOccupied(dt)) available++;
    });

    return available === 0;
  }

  function handleDateSelection(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isPast = date <= today;
    const isOccupied = isDayCompletelyOccupied(date);

    if (isWeekend || isPast || isOccupied) {
      return;
    }

    selectedDate = date;
    applySelectedDayStyling();

    if (selectedDayLabel) {
      selectedDayLabel.textContent = formatSelectedDayLabel(date);
    }

    openTimeSelection(date);
    updateCalStep("time");
  }

  function openTimeSelection(date) {
    if (!timeSelectionEl || !timeSelectionModal) return;

    timeSelectionEl.innerHTML = "";

    const times = [];
    for (let hour = 10; hour <= 19; hour++) {
      times.push({ hour, minute: 0 }, { hour, minute: 30 });
    }
    times.push({ hour: 20, minute: 0 });

    times.forEach((time) => {
      const dt = new Date(date);
      dt.setHours(time.hour, time.minute, 0, 0);

      if (!isTimeSlotOccupied(dt)) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.innerText = `${String(time.hour).padStart(2, "0")}:${String(
          time.minute,
        ).padStart(2, "0")}`;

        btn.addEventListener("click", function () {
          if (currentInputField && selectedDate) {
            currentInputField.value = `${String(
              selectedDate.getDate(),
            ).padStart(2, "0")}/${String(selectedDate.getMonth() + 1).padStart(
              2,
              "0",
            )}/${selectedDate.getFullYear()} ${btn.innerText}`;

            currentInputField.dispatchEvent(
              new Event("input", { bubbles: true }),
            );
            currentInputField.dispatchEvent(
              new Event("change", { bubbles: true }),
            );
          }

          window.MultiStepForm?.closeCalendarOverlay?.(() => {
            updateCalStep("date");
          });
        });

        timeSelectionEl.appendChild(btn);
      }
    });
  }

  function applySelectedDayStyling() {
    calendar.el
      .querySelectorAll(".fc-day-selected-custom")
      .forEach((el) => el.classList.remove("fc-day-selected-custom"));

    if (!selectedDate) return;

    const dateKey = formatDateForComparison(selectedDate);
    const selectedCell = calendar.el.querySelector(`[data-date="${dateKey}"]`);

    if (selectedCell) {
      selectedCell.classList.add("fc-day-selected-custom");
    }
  }
  function scrollCalendarToTop() {
    const modalScrollBox = document.querySelector(
      ".calendar-overlay .form_modal",
    );
    if (!modalScrollBox) return;

    modalScrollBox.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    firstDay: 1,
    selectable: true,
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next",
    },
    locale: "it",
    buttonText: { today: "oggi" },
    dayHeaderFormat: { weekday: "short" },

    selectAllow: (selectInfo) => {
      const selectedDate = selectInfo.start;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isWeekend =
        selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
      if (isWeekend) return false;
      if (selectedDate <= today) return false;
      if (isDayCompletelyOccupied(selectedDate)) return false;

      return true;
    },

    eventSourceSuccess: function () {
      setTimeout(() => {
        applyOccupiedDaysStyling();
      }, 50);
    },

    datesSet: function () {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dayEls = calendarEl.querySelectorAll(".fc-daygrid-day");
      dayEls.forEach((dayEl) => {
        const dateStr = dayEl.getAttribute("data-date");
        if (dateStr) {
          const cellDate = new Date(dateStr + "T00:00:00");
          if (cellDate < today) {
            dayEl.classList.add("fc-day-past");
          }
        }
      });

      calendar.refetchEvents();
    },

    select: (info) => {
      handleDateSelection(info.start);
    },

    dateClick: (info) => {
      handleDateSelection(info.date);
    },

    dayCellClassNames: function (info) {
      const classes = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (info.date < today) classes.push("fc-day-past");
      if (info.date > today && isDayCompletelyOccupied(info.date)) {
        classes.push("fc-day-occupied");
      }

      return classes;
    },

    events: async (fetchInfo, successCallback, failureCallback) => {
      try {
        const response = await fetch(
          "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getCalendarEvents",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timeMin: fetchInfo.startStr,
              timeMax: fetchInfo.endStr,
            }),
          },
        );

        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);

        const events = await response.json();
        events.forEach((event) => (event.className = "hidden-event"));
        successCallback(events);
      } catch (err) {
        console.error("Errore nel recupero degli eventi:", err);
        failureCallback(err);
      }
    },

    eventOverlap: false,
    selectOverlap: (event) => !event,
    eventBackgroundColor: "red",
  });

  calendar.render();

  currentInputField =
    inputFields[0] || document.querySelector(".form-text-field-2");

  if (backBtn) {
    const handleBackClick = (e) => {
      e.preventDefault();
      updateCalStep("date");
    };

    backBtn.addEventListener("click", handleBackClick);

    if (!Array.isArray(window.pageSpecificListeners)) {
      window.pageSpecificListeners = [];
    }

    window.pageSpecificListeners.push({
      element: backBtn,
      event: "click",
      handler: handleBackClick,
    });
  }

  updateCalStep("date");
  window.__calendarCleanup = () => {
    try {
      calendar.destroy();
    } catch (_) {}

    if (calendarEl) {
      delete calendarEl.dataset.initialized;
    }
  };
}

Object.assign(window, {
  calendar,
});
