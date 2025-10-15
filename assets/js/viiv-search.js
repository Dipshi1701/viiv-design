(function () {
const byId = (id) => document.getElementById(id);

class Search {
constructor(scope) {
this.scope = scope;
this.searchButton = this.scope.querySelector("#buttonsearch");
this.inputValue = this.scope.querySelector("#valuetext");
this.boxDB = this.scope.querySelector("#r1");
this.boxSite = this.scope.querySelector("#r2");
this.aiSummary = this.scope.querySelector("#r0");
this.genAISel = "#generative-ai";
this.genAI = null;
this.sdk = null;
this.SDK_CONSENT_KEY = "generative-ai-consent";
this._sessionReady = false;
}

main() {
this.sdkSearch();
this.restoreAndClearLastQuery();
this.attachAnalytics();
this.buttonState();
}

hasConsent = () => {
try {
const raw = localStorage.getItem(this.SDK_CONSENT_KEY);
if (!raw) return false;
const obj = JSON.parse(raw);
if (obj?.value !== true) return false;
if (obj?.expiresAt && Number.isFinite(obj.expiresAt))
return Date.now() < obj.expiresAt; return true; } catch { return false; } }; ensureSession=async ()=> {
    if (this._sessionReady) return;
    if (!this.sdk || !this.sdk.client) return;
    const sess = await this.sdk.client.generateSession();
    if (sess?.sessionToken) {
    this.sdk.client.setSession(sess.sessionToken);
    this._sessionReady = true;
    console.log("session ready");
    } else {
    throw new Error("generateSession returned no sessionToken");
    }
    };

    settings = {
    productquery: [
    [
    "Abacavir",
    "Abacavir Dolutegravir Lamivudine",
    "Abacavir Lamivudine",
    "Abacavir Lamivudine Zidovudine",
    "Dolutegravir",
    "Dolutegravir Lamivudine",
    "Dolutegravir Rilpivirine",
    "Fosamprenavir",
    "Fostemsavir",
    "Lamivudine Zidovudine",
    "Lamivudine HIV",
    "Maraviroc",
    "Cabotegravir Rilpivirine",
    "Cabotegravir Tablet",
    "Cabotegravir injection",
    ],
    [
    "Ziagen",
    "Triumeq",
    "Epzicom",
    "Trizivir",
    "Tivicay",
    "Dovato",
    "Juluca",
    "Lexiva",
    "Rukobia",
    "Combivir",
    "Epivir",
    "Selzentry",
    "Cabenuva",
    "Vocabria",
    "Apretude",
    ],
    [
    "Abacavir",
    "Abacavir+Dolutegravir+Lamivudine",
    "Abacavir+Lamivudine",
    "Abacavir+Lamivudine+Zidovudine",
    "Dolutegravir",
    "Dolutegravir+Lamivudine",
    "Dolutegravir+Rilpivirine",
    "Fosamprenavir",
    "Fostemsavir",
    "Lamivudine+Zidovudine",
    "Lamivudine_HIV",
    "Maraviroc",
    "Cabotegravir and Rilpivirine",
    "Cabotegravir_Tablet",
    "Cabotegravir_injection (HIV PrEP)",
    ],
    ],
    referencePi: {
    "document-30591":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Juluca/pdf/JULUCA-PI-PIL.PDF#page=1",
    "document-141085":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Dovato/pdf/DOVATO-PI-PIL.PDF#page=1",
    "document-211150":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Cabenuva/pdf/CABENUVA-PI-PIL-IFU2-IFU3.PDF",
    "document-233343":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Apretude/pdf/APRETUDE-PI-PIL-IFU.PDF",
    "document-30590":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Tivicay/pdf/TIVICAY-PI-PIL-IFU.PDF#page=1",
    "document-30568":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Triumeq/pdf/TRIUMEQ-PI-MG.PDF#page=1",
    "document-211153":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Vocabria/pdf/VOCABRIA-PI-PIL.PDF",
    "document-197629":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Rukobia/pdf/RUKOBIA-PI-PIL.PDF",
    "document-30594":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Combivir/pdf/COMBIVIR.PDF",
    "document-30595":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Epivir/pdf/EPIVIR-PI-PIL.PDF",
    "document-30592":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Epzicom/pdf/EPZICOM-PI-MG.PDF",
    "document-30588":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Retrovir/pdf/RETROVIR-PI.PDF",
    "document-30599":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Selzentry/pdf/SELZENTRY-PI-MG-IFU.PDF#page=1",
    "document-30596":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Lexiva/pdf/LEXIVA-PI-PIL.PDF",
    "document-30569":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Trizivir/pdf/TRIZIVIR-PI-MG.PDF",
    "document-30572":
    "https://gskpro.com/content/dam/global/hcpportal/en_US/Prescribing_Information/Ziagen/pdf/ZIAGEN-PI-MG.PDF",
    },
    };

    templates = {
    templateDB: `<div id="document-{{{ attributes.DOCUMENT_ID }}}"
        class="medicine-button medicine-button--{{{ attributes.CONTENT_TYPE }}} icon icon--{{{ attributes.CONTENT_TYPE }}}">
    </div>
    <div class=" item">
        <a class="item__link inbenta-search-title" id="product-{{{ attributes.PRODUCT }}}" target="_blank"
            href="{{{ __url }}}" {{{ __clickable }}}>
            <span>{{{ highlightedTitle }}}</span>
        </a>
        <br />
    </div>`,

    templateSite: `<div
        class="medicine-button medicine-button--{{{ attributes.SOURCE_TYPE }}} icon icon--{{{ attributes.SOURCE_TYPE }}}">
    </div>
    <div class=" item">
        <a id="{{{ id }}}" class="item__link  inbenta-search-title" target="_blank" href="{{{ urlWithContentType }}}"
            {{{ __clickable }}}>
            <span>{{{ highlightedTitle }}}</span>
        </a>
        <br />
        <span class="inbenta-search-results__item-summary item__summary">{{{ attributes.DESC }}}</span>
    </div>`,
    disclaimer: `
     <section class="sidebar-card disclaimer-card">
          <h5 class="sidebar-title">Medical Disclaimer</h5>
          <p class="sidebar-desc">This content is AI-generated for informational purposes only and should not replace professional medical advice, diagnosis, or treatment.</p>
        </section>
     `,
    };

    resultOptions = ({ template, attribute }) => {
    return {
    searchBox: { autofocus: false },
    stats: {
    text: "Results {{ first }}-{{ last }} of {{ totalResults }} for: {{ query }}",
    },
    transformData: (result) => {
    result.highlightedTitle =
    result.highlightedTitle || result.title || "";
    const rawUrl = result.attributes?.URL;
    const contentType = result.attributes?.SOURCE_TYPE || "";
    try {
    if (rawUrl) {
    const url = new URL(rawUrl, window.location.origin);
    url.searchParams.set("contentType", contentType);
    result.urlWithContentType = url.toString();
    } else {
    result.urlWithContentType = "#";
    }
    } catch (e) {
    result.urlWithContentType = rawUrl || "#";
    }
    return result;
    },
    templates: { header: "", item: template, footer: "" },
    ratings: [
    { id: 1, label: "Yes", comment: false },
    { id: 2, label: "No", comment: false },
    ],
    resultsPerPage: 5,
    refinementLists: { refinements: [] },
    refinementTabs: { attributeName: attribute },
    };
    };

    searchHandler = async (resultsDB, resultsWeb) => {
    resultsDB.searchStore.reset();
    resultsWeb.searchStore.reset();

    const q = (this.inputValue.value || "").trim();
    const s = q.toLowerCase();

    const i1 = this.settings.productquery[0].findIndex((el) => s.includes(el.toLowerCase()));
    const i2 = this.settings.productquery[1].findIndex((el) => s.includes(el.toLowerCase()));

    if (i1 >= 0 || i2 >= 0) {
    const pf = i1 >= 0 ? this.settings.productquery[2][i1] : this.settings.productquery[2][i2];
    resultsWeb.searchStore.$forceFilters = [`PRODUCT:"${pf}"`, ['FORMAT:"Document"', 'FORMAT:"Video"']];
    resultsDB.searchStore.$forceFilters = [`PRODUCT:"${pf}"`, ['FORMAT:_null']];
    } else {
    resultsWeb.searchStore.$forceFilters = ['FORMAT:"Document"'];
    resultsDB.searchStore.$forceFilters = ['FORMAT:_null'];
    }

    resultsDB.searchStore.query = s;
    resultsWeb.searchStore.query = s;

    if (this.boxDB) this.boxDB.style.display = "block";
    if (this.boxSite) this.boxSite.style.display = "block";
    const ensureAiAnswer = () => {
    let el = this.scope.querySelector("#ai-answer");
    if (el) return el;

    el = document.createElement("div");
    el.id = "ai-answer";
    el.className = "inbenta-search-results";


    const parent = this.scope.querySelector(".search-box") || this.scope;
    const anchor = this.scope.querySelector("#r1");


    if (anchor && anchor.parentNode === parent) {
    parent.insertBefore(el, anchor);
    } else {
    parent.appendChild(el);
    }
    return el;
    };


    const aiHost = ensureAiAnswer();
    const srcHost = document.getElementById("ai-sources");

    if (!q) {
    aiHost.innerHTML = "";
    if (srcHost) { srcHost.innerHTML = ""; srcHost.style.display = "none"; }
    return;
    }

    if (!this.hasConsent()) {
    aiHost.innerHTML = "";
    if (srcHost) { srcHost.innerHTML = ""; srcHost.style.display = "none"; }
    return;
    }


    aiHost.innerHTML = `<div class="ai-answer">Thinking</div>`;
    if (srcHost) { srcHost.innerHTML = ""; srcHost.style.display = "none"; }

    try {
    await this.ensureSession();

    const toLogId = (r) => (typeof r === "string" ? r : (r?.response?.logId || r?.logId || ""));

    if (!this.sdk || !this.sdk.client) {
    aiHost.innerHTML = `<div class="ai-answer">Sorry, I don’t have a response for your query.</div>`;
    return;
    }

    const codeRes = await this.sdk.client.trackUserQuestion(q);
    const logId = toLogId(codeRes);
    if (!logId) {
    aiHost.innerHTML = `<div class="ai-answer">Sorry, I don’t have a response for your query.</div>`;
    return;
    }

    let data = null;
    if (this.sdk.client.generateAnswer) {
    data = await this.sdk.client.generateAnswer(q, logId);
    } else if (this.sdk.client.request) {
    data = await this.sdk.client.request("POST", "generate-answer", {
    query: q,
    questionTrackingCode: logId
    });
    }

    const html = (data?.answer || "").trim();
    const d = (this?.templates?.disclaimer) || templates.disclaimer
    aiHost.innerHTML = html
  ? `<div class="ai-answer"><h5 class="section_title">Summary</h5>${html}</div>${d}`
  : `<div class="ai-answer">Sorry, I don’t have a response for your query.</div>`;

    if (srcHost) {
    const ctx = Array.isArray(data && data.context) ? data.context : [];

    if (!ctx.length) {
    srcHost.innerHTML = "";
    srcHost.style.display = "none";
    } else {

  const itemsHtml = ctx.map((c) => {
  const raw = (c && c.answer) || "";
  const snippet = raw.split("\n").slice(0, 3).join("\n");
  const url = (c && c.url) || "#";

  // button label and safe title
  const linkLabel = (() => {
    try {
      const u = new URL(url, window.location.href);
      return u.hostname.replace(/^www\./, "");
    } catch {
      return "Open source";
    }
  })();

  const title =
    (c && (c.title || c.name || c.documentTitle || c.pageTitle)) ||
    "Source";

  return `
    <div class="sidebar-card src-card">
      <div class="sidebar-title">${title}</div>
      ${snippet ? `<p class="sidebar-desc">${snippet}</p>` : ""}
      <a href="${url}" target="_blank" rel="noopener"
         class="trapezoid-button trapezoid-button--primary src-card__button"
         aria-label="Open ${linkLabel}">
        <span class="trapezoid-button__rectangle">${linkLabel}</span>
        <span class="trapezoid-button__right-rectangle" aria-hidden="true"></span>
      </a>
    </div>
  `;
}).join("");


    srcHost.innerHTML = ` <div style="color:#E40046;margin-bottom:6px;"> Sources used for this answer (${ctx.length}):
    </div> ${itemsHtml}`;
    srcHost.style.display = "block";


    }
    }
    } catch (e) {
    aiHost.innerHTML = `<div class="ai-answer">Sorry, I don’t have a response for your query.</div>`;
    if (srcHost) { srcHost.innerHTML = ""; srcHost.style.display = "none"; }
    console.warn("Gen-AI error:", e);
    }
    };

    buttonState = () => {
    this.searchButton.disabled = this.inputValue.value === "";
    };

    async sdkSearch() {
    if (!window.InbentaSearchSDK) {
    console.error("InbentaSearchSDK is not available.");
    return;
    }

    const sdk = InbentaSearchSDK.createFromDomainKey(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiY2xuX3ZpaXZfZ2VuX2FpX3YyXzkwNDFfc2VhcmNoX2VuIiwiZG9tYWluX2tleV9pZCI6IkJqN19qTTFFRVlwMTZEMm9EaUFlUHc6OiJ9.kCsSaC86c1zKthnP7y9f47yGVtQLQxp0o-zh5gEDHd0ed-ETqWNEhs1wVhsWqk3ZirwyztnZuxdxSMNViegKIw",
    "BjmTFARIct6Ih8RUhfg2+9rPKRSK26kcnSa6KJuHl3s=",
    {
    environment: "development",
    labels: {
    AUTOCOMPLETER_VIEW_ALL_BUTTON: "View all contents",
    REFINEMENT_TABS_ALL_TAB: "All",
    REFINEMENT_LISTS_SHOW_MORE: "Show more",
    REFINEMENT_LISTS_SHOW_LESS: "Show less",
    REFINEMENT_LISTS_TITLE: "FILTERS",
    RATINGS_INTRODUCTION: "Were those results helpful ?",
    RATINGS_COMMENT_INTRODUCTION: "Comment about this results",
    RATINGS_SUBMIT_COMMENT_BUTTON: "Submit",
    RATINGS_GRETTINGS_TEXT: "Thanks for your comment!",
    SEARCH_BOX_PLACEHOLDER: "Your question here",
    NO_RESULTS_NOT_FOUND_HEADER: "",
    NO_RESULTS_NOT_FOUND_TITLE: "No results found",
    NO_RESULTS_NOT_FOUND_SUBTITLE: "",
    },
    }
    );
    this.sdk = sdk;

    let aiMount = document.getElementById("ai-answer");
    if (!aiMount) {
    aiMount = document.createElement("div");
    aiMount.id = "ai-answer";
    const searchBox = this.scope.querySelector(".search-box") || this.scope;
    searchBox.appendChild(aiMount);
    }

    const resultsSel = document.getElementById("results2") ? "#results2" : null;
    const resultsAcrossSel = document.getElementById("results") ? "#results" : null;
    const noResultsSel = document.getElementById("no-results2") ? "#no-results2" : null;
    const noResults2Sel = document.getElementById("no-results1") ? "#no-results1" : null;
    const loaderSel = document.getElementById("loader") ? "#loader" : null;

    if (!resultsSel || !resultsAcrossSel) {
    console.error("Results containers missing (#results2 and/or #results).");
    return;
    }

    const results = sdk.component(
    "results",
    resultsSel,
    this.resultOptions({ template: this.templates.templateSite, attribute: "Product Type" })
    );

    const resultsAcross = sdk.component(
    "results",
    resultsAcrossSel,
    this.resultOptions({ template: this.templates.templateDB, attribute: "Source" })
    );

    if (noResultsSel) {
    const noResults = sdk.component("no-results", noResultsSel);
    results.linkTo(noResults);
    }
    if (loaderSel) {
    const loader = sdk.component("loader", loaderSel);
    results.linkTo(loader);
    }
    if (noResults2Sel) {
    const noResults2 = sdk.component("no-results", noResults2Sel);
    resultsAcross.linkTo(noResults2);
    }


    this.genAI = await sdk.component("generative-ai-response", "#ai-answer", {
    enable: true,
    consent: {
    enable: true,
    title: "Use of Generative AI",
    body: 'Do you accept the use of Generative AI to generate responses to your questions?',
    acceptButton: "Accept",
    declineButton: "Decline",
    },
    disclaimer: { body: "This answer was generated by AI" },
    error: { notResponse: "Sorry, I don’t have a response for your query." }
    });
    this.genAIReady = await this.genAI?.untilReady || Promise.resolve();

    this.searchButton.addEventListener("click", () => this.searchHandler(results, resultsAcross));
    this.inputValue.addEventListener("keypress", (e) => { if (e.key === "Enter") this.searchHandler(results,
    resultsAcross); });
    this.inputValue.addEventListener("keyup", this.buttonState);

    results.searchStore.on("search", (res) => {
    try {
    const items = res?.results || [];
    const list = items.map((it) => `${it.id}-${(it.highlightedTitle || it.title || "").toString()}`);
    setTimeout(() => sdk.client.trackEvent("Results", { value: list }), 50);
    } catch (e) {
    console.warn("Track Results failed:", e);
    }
    });

    this.searchButton.disabled = true;
    }

    restoreAndClearLastQuery() {
    const saved = this.getLocalStorage("searchQuery");
    if (!saved) return;

    const input = this.scope.querySelector("#valuetext");
    const btn = this.scope.querySelector("#buttonsearch");
    if (!input || !btn) return;

    input.value = saved;
    input.dispatchEvent(
    new Event("input", { view: window, bubbles: true, cancelable: true })
    );
    btn.disabled = false;
    btn.click();

    this.clearLocalStorage();
    }

    getLocalStorage(key) {
    try {
    return localStorage.getItem(key);
    } catch {
    return null;
    }
    }

    clearLocalStorage() {
    try {
    localStorage.removeItem("searchQuery");
    } catch { }
    }

    attachAnalytics() {
    document.addEventListener(
    "click",
    (e) => {
    const link = e.target.closest(".item__link.inbenta-search-title");
    if (!link) return;

    const linkText = (link.textContent || "").trim();
    let url;
    try {
    url = new URL(link.href);
    } catch {
    return;
    }

    const detail = { title: linkText };

    const medcommid = url.searchParams.get("medcommid");
    if (medcommid) detail.analyticID = medcommid;

    const product = url.searchParams.get("product");
    if (product) detail.product = product;

    const contentType = url.searchParams.get("contentType");
    if (contentType) detail.contentType = contentType;

    const downloadableExtensions = [
    ".exe",
    ".zip",
    ".wav",
    ".mp3",
    ".mov",
    ".mpg",
    ".avi",
    ".wmv",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".jpg",
    ".png",
    ];

    const pathname = url.pathname.toLowerCase();
    const isDownloadable = downloadableExtensions.some((ext) =>
    pathname.endsWith(ext)
    );
    const isExternal = url.host && url.host !== window.location.host;

    if (isDownloadable) {
    detail.event = 12;
    } else if (isExternal) {
    detail.event = 13;
    } else {
    detail.event = 11;
    }

    const analyticsEvent = new CustomEvent("searchResultClick", {
    detail,
    });
    document.dispatchEvent(analyticsEvent);
    },
    true
    );
    }
    }

    document.addEventListener("DOMContentLoaded", () => {
    document
    .querySelectorAll(".reference-inbenta-search-box")
    .forEach((scope) => {
    try {
    const search = new Search(scope);
    search.main();
    } catch (e) {
    console.error("Search init failed:", e);
    }
    });
    });

    window.Search = Search;
    })();