
export default { AppForms: window.AppForms, AppResetPassword: window.AppResetPassword, AppUpdatePassword: window.AppUpdatePassword, AppGeneralForms:window.AppGeneralForms,
    AppAssessmentForms: window.AppAssessmentForms, AppPasswordToggleLogin: window.AppPasswordToggleLogin, AppPasswordToggle: window.AppPasswordToggle, MultiStepForm: window.MultiStepForm };


window.AppForms = window.AppForms || {
    init: function () {
      // Assicuriamoci che l'array dei listener esista
      if (!window.pageSpecificListeners) {
        window.pageSpecificListeners = [];
      }
  
      this.handleForms();
    },
  
    handleForms: function () {
      jQuery('form[action*="registerUser"]').each(function (i, el) {
        var form = jQuery(el)[0]; // Converto in nodo puro
  
        // **🔹 Rimuove action e method per evitare reindirizzamenti**
        form.removeAttribute("action");
        form.removeAttribute("method");
  
        // **🔹 Creiamo il nuovo handler di submit**
        const submitHandler = function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
  
          jQuery(".lottie-waiting").css({
            visibility: "visible",
            opacity: "1"
          });
  
          var data = AppForms.convertFormToJSON(form);
          var action =
            "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/registerUser";
  
          jQuery.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
              if (response.success) {
                console.log("✅ Registrazione avvenuta con successo!");
                jQuery(form).hide();
                jQuery(form).parent().children(".w-form-done").fadeIn();
              } else {
                console.warn("❌ Errore di registrazione:", response.error);
                jQuery(form)
                  .parent()
                  .children(".w-form-fail")
                  .fadeIn()
                  .text(response.error);
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error(
                "❌ Errore registrazione:",
                textStatus,
                errorThrown,
                jqXHR.responseText
              );
              jQuery(form)
                .parent()
                .children(".w-form-fail")
                .fadeIn()
                .text("Errore durante la registrazione. Riprova.");
            },
            complete: function () {
              jQuery(".lottie-waiting").css({
                visibility: "hidden",
                opacity: "0"
              });
            },
          });
        };
  
        // **Aggiungiamo il nuovo listener e lo registriamo nell'array globale**
        form.addEventListener("submit", submitHandler);
        window.pageSpecificListeners.push({
          element: form,
          event: "submit",
          handler: submitHandler,
        });
      });
    },
  
    convertFormToJSON: function (form) {
      var array = jQuery(form).serializeArray();
      var json = {};
      jQuery.each(array, function () {
        json[this.name] = this.value || "";
      });
      return json;
    },
  };
  
  window.AppResetPassword = window.AppResetPassword || {
    init: function () {
      console.log("🔑 Inizializzazione AppResetPassword...");
  
      if (!window.pageSpecificListeners) {
        window.pageSpecificListeners = [];
      }
  
      this.handleForms();
    },
  
    handleForms: function () {
      jQuery('form[action*="sendPasswordResetEmail"]').each(function (i, el) {
        var form = jQuery(el)[0];
  
        form.removeAttribute("action");
        form.removeAttribute("method");
  
        const submitHandler = function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
  
          jQuery(".lottie-waiting").css({
            visibility: "visible",
            opacity: "1"
          });
  
          var data = AppResetPassword.convertFormToJSON(form);
          var action =
            "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/sendPasswordResetEmail";
  
          jQuery
            .ajax({
              url: action,
              method: "POST",
              data: JSON.stringify(data),
              contentType: "application/json",
              dataType: "json",
            })
            .done(function (response) {
              if (response.success) {
                console.log("✅ Email di reset inviata con successo!");
                jQuery(form).hide();
                jQuery(form).parent().children(".w-form-done").fadeIn();
              } else {
                console.warn(
                  "❌ Errore nell'invio della richiesta:",
                  response.error
                );
                jQuery(form)
                  .parent()
                  .children(".w-form-fail")
                  .fadeIn()
                  .text(response.error);
              }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
              console.error(
                "❌ Errore richiesta reset password:",
                textStatus,
                errorThrown,
                jqXHR.responseText
              );
              jQuery(form)
                .parent()
                .children(".w-form-fail")
                .fadeIn()
                .text("Errore durante l'invio della richiesta. Riprova.");
            })
            .always(function () {
              jQuery(".lottie-waiting").css({
                visibility: "hidden",
                opacity: "0"
              });
            });
        };
  
        // **🔹 Aggiungiamo il nuovo listener e lo registriamo nell'array globale**
        form.addEventListener("submit", submitHandler);
        window.pageSpecificListeners.push({
          element: form,
          event: "submit",
          handler: submitHandler,
        });
      });
    },
  
    convertFormToJSON: function (form) {
      var array = jQuery(form).serializeArray();
      var json = {};
      jQuery.each(array, function () {
        json[this.name] = this.value || "";
      });
      return json;
    },
  };
  
  window.AppUpdatePassword = window.AppUpdatePassword || {
    init: function () {
      console.log("🔑 Inizializzazione AppUpdatePassword...");
  
      if (!window.pageSpecificListeners) {
        window.pageSpecificListeners = [];
      }
  
      this.handleForms();
    },
  
    handleForms: function () {
      jQuery('form[action*="updatePassword"]').each(function (i, el) {
        var form = jQuery(el)[0];
  
        // **🔹 Rimuove action e method per evitare reindirizzamenti**
        form.removeAttribute("action");
        form.removeAttribute("method");
  
        // **🔹 Recupera il token dalla URL**
        // 🔹 Recupera il token e l'email dalla URL
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
        //console.log("📌 Token ricevuto:", token);
        //console.log("📧 Email ricevuta:", email);
  
        // **🔹 Creiamo il nuovo handler di submit**
        const submitHandler = async function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
  
          jQuery(".lottie-waiting").css({
            visibility: "visible",
            opacity: "1"
          });
  
          // **🔹 Recupera la password dal form**
          // 🔹 Aggiungiamo email, token e nuova password
          var data = AppUpdatePassword.convertFormToJSON(form);
          data.token = token;
          data.email = email;
          data.newPassword = data.password;
          delete data.password;
  
          console.log("📌 Dati inviati:", data);
  
          var action =
            "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/updatePassword";
  
          jQuery.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
              if (response.success) {
                console.log("✅ Password aggiornata con successo!");
                jQuery(form).hide();
                jQuery(form).parent().children(".w-form-done").fadeIn();
              } else {
                console.warn(
                  "❌ Errore nell'aggiornamento della password:",
                  response.error
                );
                jQuery(form)
                  .parent()
                  .children(".w-form-fail")
                  .fadeIn()
                  .text(response.error);
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error(
                "❌ Errore nell'aggiornamento della password:",
                textStatus,
                errorThrown,
                jqXHR.responseText
              );
              jQuery(form)
                .parent()
                .children(".w-form-fail")
                .fadeIn()
                .text("Errore durante l'aggiornamento della password. Riprova.");
            },
            complete: function () {
              jQuery(".lottie-waiting").css({
                visibility: "hidden",
                opacity: "0"
              });
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
      var array = jQuery(form).serializeArray();
      var json = {};
      jQuery.each(array, function () {
        json[this.name] = this.value || "";
      });
      return json;
    },
  };
  
  window.AppGeneralForms = window.AppGeneralForms || {
    init: function () {
      console.log("📝 Inizializzazione CTA AppGeneralForm...");
  
      // Assicuriamoci che l'array dei listener esista
      if (!window.pageSpecificListeners) {
        window.pageSpecificListeners = [];
      }
  
      this.handleForms();
    },
  
    handleForms: function () {
      jQuery(
        'form[action="https://us-central1-webflow-project---calltoaction.cloudfunctions.net/webhook"]'
      ).each(function (i, el) {
        var form = jQuery(el)[0]; // Converto in nodo puro
  
        // **🔹 Rimuove action e method per evitare reindirizzamenti**
        form.removeAttribute("action");
        form.removeAttribute("method");
  
        // **🔹 Creiamo il nuovo handler di submit**
        const submitHandler = function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
  
          jQuery(".lottie-waiting").css({
            visibility: "visible",
            opacity: "1"
          });
  
          var data = AppGeneralForms.convertFormToJSON(form);
          data.formId = form.id || "unknown-form"; // Se il form non ha ID, assegna un valore di default
          var action =
            "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/webhook";
  
          jQuery.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
              console.log("✅ Invio form avvenuto con successo:");
              jQuery(form).hide();
              jQuery(form).parent().children(".w-form-done").fadeIn();
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error(
                "❌ Errore invio form:",
                textStatus,
                errorThrown,
                jqXHR.responseText
              );
              jQuery(form).parent().children(".w-form-fail").fadeIn();
            },
            complete: function () {
              jQuery(".lottie-waiting").css({
                visibility: "hidden",
                opacity: "0"
              });
            },
          });
        };
  
        // **🔹 Aggiungiamo il nuovo listener e lo registriamo nell'array globale**
        form.addEventListener("submit", submitHandler);
        window.pageSpecificListeners.push({
          element: form,
          event: "submit",
          handler: submitHandler,
        });
      });
    },
  
    convertFormToJSON: function (form) {
      var array = jQuery(form).serializeArray();
      var json = {};
      jQuery.each(array, function () {
        json[this.name] = this.value || "";
      });
      return json;
    },
  };
  
  window.AppAssessmentForms = window.AppAssessmentForms || {
    init: function () {
      if (!window.pageSpecificListeners) {
        window.pageSpecificListeners = [];
      }
  
      this.handleForms();
    },
  
    handleForms: function () {
      jQuery(
        'form[action="https://us-central1-webflow-project---calltoaction.cloudfunctions.net/webhook"]'
      ).each(function (i, el) {
        var form = jQuery(el)[0]; // Converto in nodo puro
  
        // ** Rimuove action e method per evitare reindirizzamenti**
        form.removeAttribute("action");
        form.removeAttribute("method");
  
        // ** Creiamo il nuovo handler di submit**
        const submitHandler = async function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
  
          jQuery(".lottie-waiting").css({
            visibility: "visible",
            opacity: "1"
          });
  
          //  **Recupera l'UID dell'utente loggato**
          const user = firebase.auth().currentUser;
          const userId = user ? user.uid : null; // Se non c'è UID, lo lascia null
  
          var data = AppAssessmentForms.convertFormToJSON(form);
          data.formId = form.id || "unknown-form"; // Se il form non ha ID, assegna un valore di default
          data.uid = userId; //  **Aggiunge l'UID dell'utente loggato**
  
          var action =
            "https://us-central1-webflow-project---calltoaction.cloudfunctions.net/webhook";
  
          jQuery.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
              console.log("✅ Invio form avvenuto con successo:");
              jQuery(form).hide();
              jQuery(form).parent().children(".w-form-done").fadeIn();
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error(
                "❌ Errore invio form:",
                textStatus,
                errorThrown,
                jqXHR.responseText
              );
              jQuery(form).parent().children(".w-form-fail").fadeIn();
            },
            complete: function () {
              jQuery(".lottie-waiting").css({
                visibility: "hidden",
                opacity: "0"
              });
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
      var array = jQuery(form).serializeArray();
      var json = {};
      jQuery.each(array, function () {
        json[this.name] = this.value || "";
      });
      return json;
    },
  };
  
  window.AppPasswordToggleLogin = window.AppPasswordToggleLogin || {
    init: function () {
      // Seleziona gli elementi
      var passwordField = document.getElementById("loginPassword");
      var eyeButton = document.getElementById("eye-button");
      var eyeOpen = document.getElementById("pass-eye");
      var eyeClosed = document.getElementById("pass-eye-none");
  
      if (!passwordField || !eyeButton || !eyeOpen || !eyeClosed) {
        console.warn("⚠️ Elementi per il toggle password non trovati.");
        return;
      }
  
      eyeOpen.style.display = "none"; // Nasconde l'occhio aperto all'inizio
  
      const togglePasswordHandler = function () {
        if (passwordField.type === "password") {
          passwordField.type = "text";
          eyeClosed.style.display = "none"; // Nasconde l'occhio sbarrato
          eyeOpen.style.display = "block"; // Mostra l'occhio aperto
        } else {
          passwordField.type = "password";
          eyeOpen.style.display = "none"; // Nasconde l'occhio aperto
          eyeClosed.style.display = "block"; // Mostra l'occhio sbarrato
        }
      };
  
      eyeButton.addEventListener("click", togglePasswordHandler);
      window.pageSpecificListeners.push({
        element: eyeButton,
        event: "click",
        handler: togglePasswordHandler,
      });
    },
  };
  
  window.AppPasswordToggle = window.AppPasswordToggle || {
    init: function () {
      // Seleziona gli elementi
      var passwordField = document.getElementById("password");
      var eyeButton = document.getElementById("eye-button");
      var eyeOpen = document.getElementById("pass-eye");
      var eyeClosed = document.getElementById("pass-eye-none");
  
      if (!passwordField || !eyeButton || !eyeOpen || !eyeClosed) {
        console.warn("⚠️ Elementi per il toggle password non trovati.");
        return;
      }
  
      eyeOpen.style.display = "none"; // Nasconde l'occhio aperto all'inizio
  
      const togglePasswordHandler = function () {
        if (passwordField.type === "password") {
          passwordField.type = "text";
          eyeClosed.style.display = "none"; // Nasconde l'occhio sbarrato
          eyeOpen.style.display = "block"; // Mostra l'occhio aperto
        } else {
          passwordField.type = "password";
          eyeOpen.style.display = "none"; // Nasconde l'occhio aperto
          eyeClosed.style.display = "block"; // Mostra l'occhio sbarrato
        }
      };
  
      eyeButton.addEventListener("click", togglePasswordHandler);
      window.pageSpecificListeners.push({
        element: eyeButton,
        event: "click",
        handler: togglePasswordHandler,
      });
    },
  };
  
window.MultiStepForm = window.MultiStepForm || (() => {
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
        updateNextButtonState(step);
      });
  
      setupEvents();
      setupEnterKey();
      updateStep();
    }
  
    function setupEvents() {
      const nextButtons = formElement.querySelectorAll("[data-form='next-btn']");
      const backButtons = formElement.querySelectorAll("[data-form='back-btn']");
      const submitButton = formElement.querySelector("[data-form='submit-btn']");
  
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
          updateNextButtonState(step);
        });
      });
    }
  
    function setupStepValidation(step) {
      // Gestione checkbox
      const requiredCheckboxes = step.querySelectorAll("[data-checkbox]");
      if (requiredCheckboxes.length > 0) {
        requiredCheckboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            updateNextButtonState(step);
          });
        });
      }
  
      // Gestione input richiesti
      const requiredInputs = step.querySelectorAll("input[required]");
      if (requiredInputs.length > 0) {
        requiredInputs.forEach((input) => {
          ["input", "change"].forEach((eventType) => {
            input.addEventListener(eventType, () => {
              updateNextButtonState(step);
            });
          });
        });
      
        // ✅ Esegui una verifica ritardata solo una volta per tutti gli input
        setTimeout(() => {
          updateNextButtonState(step);
        }, 300);
      }
      
  
      // Gestione radio button con avanzamento automatico
      const radioInputs = step.querySelectorAll("[data-radio-skip='true']");
      if (radioInputs.length > 0) {
        radioInputs.forEach((radio) => {
          radio.addEventListener("change", () => {
            setTimeout(() => {
              nextStep();
            }, parseInt(radio.dataset.radioDelay || "0", 10));
          });
        });
      }
  
      // Gestione password
      setupPasswordValidation(step);
      setupPhoneAutoFormat(step);
      updateNextButtonState(step);
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
            10
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
          updateNextButtonState(step);
        });
      });
    }
  
    function validateStep() {
      const currentStep = steps[currentStepIndex];
      const requiredCheckboxes = currentStep.querySelectorAll(
        "input[type='checkbox'][data-checkbox]"
      );
  
      if (requiredCheckboxes.length > 0) {
        const requiredCount =
          parseInt(currentStep.getAttribute("data-checkbox"), 10) || 0;
        const checkedCount = Array.from(requiredCheckboxes).filter(
          (checkbox) => checkbox.checked
        ).length;
  
        return checkedCount >= requiredCount;
      }
      return true;
    }
  
    function updateNextButtonState(step) {
      const requiredCheckboxes = step.querySelectorAll(
        "input[type='checkbox'][data-checkbox]"
      );
      const requiredInputs = step.querySelectorAll("input[required]");
      const nextButton = step.querySelector("[data-form='next-btn']");
  
      if (!nextButton) return;
  
      let isValid = true;
  
      if (requiredCheckboxes.length > 0) {
        const requiredCount =
          parseInt(step.getAttribute("data-checkbox"), 10) || 0;
        const checkedCount = Array.from(requiredCheckboxes).filter(
          (checkbox) => checkbox.checked
        ).length;
        if (checkedCount < requiredCount) isValid = false;
      }
  
      if (requiredInputs.length > 0) {
        requiredInputs.forEach((input) => {
          const value = input.value;
      
          // Controllo robusto per ogni tipo di input
          if (
            value === null ||
            value === undefined ||
            value === "" ||
            (typeof value === "string" && value.trim().length === 0)
          ) {
            isValid = false;
          }
        });
      }
      
  
      nextButton.disabled = !isValid;
      nextButton.style.pointerEvents = isValid ? "auto" : "none";
      nextButton.style.opacity = isValid ? "1" : "0.6";
    }
  
    function updateProgress(formElement) {
        if (!formElement) {        
          return;
        }
      
        // ✅ Seleziona gli indicatori personalizzati
        const customIndicators = formElement.querySelectorAll("[data-form='custom-progress-indicator']");
      
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
        const progressContainer = formElement.querySelector("[data-form='progress']");
        const progressIndicator = formElement.querySelector("[data-form='progress-indicator']");
        const progressTextElements = formElement.querySelectorAll("[data-form='progress-percent']");
      
        if (!progressContainer || !progressIndicator) {          
          return;
        }
      
        const totalSteps = steps.length;
        const progressPercentage = Math.round(((currentStepIndex + 1) / totalSteps) * 100);
      
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
      steps.forEach((step, index) => {
        const timeline = gsap.timeline();
  
        if (index === currentStepIndex) {
          timeline
            .set(step, { display: "flex" })
            .to(window, { duration: 0.5, scrollTo: { y: 0 }, ease: "power1.out" })
            .to(step, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, "<");
        } else {
          timeline
            .set(step, { display: "none" })
            .to(step, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
        }
      });
      const currentForm = document.querySelector("[data-form='multistep']"); // 🔹 Seleziona il form attivo

      if (currentForm) {
        updateProgress(currentForm);
        updateProgressBar(currentForm);
      } else {
        console.warn(" Nessun form trovato per aggiornare il progresso.");
      }
    
      smoothScrollToTop();
    }
  
    return { init };
  })();


  
