# جرد الأصول — Asset Inventory

فُحصت كل الملفات برمجيًا (الأبعاد، الصيغة، وقناة Alpha الفعلية لا اسم الملف).
الأصول الأصلية محفوظة **دون أي تعديل** في `design-source/originals/`، والنسخ المعالجة للويب تُولَّد في `public/assets/` بالأمر:

```bash
python3 scripts/process-assets.py
```

## الخلاصة

- **38 ملفًا أصليًا** (≈130MB) ← **الأصول المنشورة ≈2.8MB** بصيغة WebP (جودة 90، Alpha كاملة) دون فقدان ملمس الفرشاة.
- الشخصيات الخمس متوفرة كقصاصات بشفافية حقيقية.
- المعالجة المطبقة: قص الهوامش الشفافة فقط (لا قص لأي جزء من الرسم)، تصغير متناسب، إزالة هالة مها، تسطيح مشهد الواحة.

## ما يحتاج قرارًا من فريق الهوية

| # | الملاحظة | ما فعلناه مؤقتًا |
|---|---|---|
| 1 | **أيقونة «عالم زيزو» مفقودة**: `icons/ai.png` نسخة مطابقة بايتيًا لـ `icons/stories.png`. | استُخدمت رسمة زيزو البديلة (`zizou-star.webp`) كأيقونة مؤقتة، ومُعلَّمة `provisional` في `src/lib/brand-assets.ts`. **ليست أصلًا معتمدًا.** |
| 2 | **الأيقونات الأصلية يغلب عليها البنفسجي** (القصص، السور، الألعاب، الرسم، شريط المسابقات)، وهذا يخالف شرط تمييز الأقسام لونيًا. | وُلّدت نسخ بتدوير الصبغة البنفسجية فقط إلى لون كل قسم (سور: فيروزي، ألعاب: أزرق، رسم ومسابقات: مرجاني). النسخ الأصلية غير الملوّنة محفوظة في `public/assets/icons/original/` ويمكن الرجوع إليها بتغيير سطر واحد في السكربت. |
| 3 | **تعارض في تصميم بعض الشخصيات بين الملفات**: ثعلوب بنظارة/بلا نظارة، نور بوشاح فيروزي/بنفسجي، زيزو بقلب/بنجمة. | اعتُمدت الملفات المسماة بأسماء الشخصيات (`thaloob.png` بالنظارة كما في الوصف الرسمي). صورة الصف في التذييل تُظهر ثعلوب بلا نظارة. |
| 4 | لا توجد خطوط أو خلفيات أو أنماط زخرفية ضمن الملفات. | خطوط مفتوحة الترخيص (OFL) مستضافة ذاتيًا: Baloo Bhaijaan 2، Tajawal، Amiri. الزخارف (شريط السدو، الكثبان، النجوم) مرسومة بـ SVG كعناصر تصميمية، **لا كأصول معتمدة**. |
| 5 | لا توجد أغلفة للقصص ولا رسوم داخلية. | أغلفة مركّبة من ألوان الهوية وصورة بطل القصة. |
| 6 | ملف الـ BRD المذكور في الطلب (PDF) لم يكن ضمن المستودع. | اعتُمد على نص الطلب فقط. |

## تحديث: أيقونات الأقسام

بطلب من صاحب المشروع استُبدلت أيقونات الأقسام المرسومة (PNG) بمجموعة متجهة موحّدة مرسومة يدويًا بـ SVG في `src/components/brand/SectionIcon.tsx`، بألوان مستمدة من ألوان الشخصيات. ملفات الأيقونات الأصلية ونسخها المعالجة ما زالت محفوظة دون استخدام في الواجهة.

## أيقونات Lordicon المتحركة

الأيقونات المتحركة ملفات Lottie من Lordicon (عائلة Doodle، نمط Outline) نُزّلت من حساب المشروع ووُضعت في `public/assets/lordicon/`، وتُعرض عبر المشغّل `@lordicon/element` فوق بلاطة القسم الملوّنة مع إعادة تلوين الخط. الترخيص المجاني يشترط ذكر المصدر، وهو مذكور في تذييل الموقع.

| القسم | الملف | الأيقونة |
|---|---|---|
| القصص | `stories.json` | Book (book-bookmark) |
| التعلّم | `learn.json` | Ebook Reader |
| المسابقات | `competitions.json` | Alarm |

بقية الأقسام (السور، الألعاب، الرسم، زيزو، القيم) تعرض أيقونتها المتجهة الثابتة إلى أن تُضاف ملفاتها؛ الخريطة في `src/data/animated-icons.ts`. مفتاح الـ API المتاح لا يفتح سوى ثلاث أيقونات غير مناسبة، والتنزيل من الموقع يتطلب حسابًا.

## الجدول التفصيلي

| الملف (داخل `design-source/originals/`) | الأبعاد والصيغة | شفافية Alpha حقيقية؟ | ما يمثله | موضع الاستخدام | الملاءمة | عيوب / معالجة | النسخة المعالجة |
|---|---|---|---|---|---|---|---|
| `logo/jamool-logo.png` | 1424×1104 PNG | نعم | شعار جمّول الرئيسي | الترويسة، التذييل، أيقونة الموقع | جاهز بعد القص | هامش شفاف 44% → قُصّ الهامش فقط | `public/assets/brand/jamool-logo.webp` |
| `icons/Playful Content and Video Icon.png` | 1536×1024 PNG | نعم | أيقونة فيديو/وسائط | غير مستخدمة حاليًا (لا يوجد قسم فيديو) | جيدة | — | `public/assets/icons/media.webp` |
| `icons/ai.png` | 1536×1024 PNG | نعم | **ليست أيقونة زيزو**: نسخة مطابقة بايتيًا لـ stories.png | — | **أصل مفقود** | مطابق MD5 لأيقونة القصص | — |
| `icons/art.png` | 1536×1024 PNG | نعم | أيقونة الرسم | قسم الرسم | ممتاز | يغلب عليها البنفسجي → نسخة ملوّنة بالمرجاني | `public/assets/icons/art.webp` |
| `icons/competitions.png` | 1536×1024 PNG | نعم | أيقونة المسابقات | قسم المسابقات | ممتاز | الشريط بنفسجي → نسخة ملوّنة بالمرجاني | `public/assets/icons/competitions.webp` |
| `icons/games.png` | 1536×1024 PNG | نعم | أيقونة الألعاب | قسم الألعاب | ممتاز | يغلب عليها البنفسجي → نسخة ملوّنة بالأزرق | `public/assets/icons/games.webp` |
| `icons/learning.png` | 1536×1024 PNG | نعم | أيقونة الحروف والأرقام | قسم التعلم | ممتاز | — | `public/assets/icons/learn.webp` |
| `icons/stories.png` | 1536×1024 PNG | نعم | أيقونة القصص | قسم القصص | ممتاز | هوامش فارغة | `public/assets/icons/stories.webp` |
| `icons/surahs.png` | 1536×1024 PNG | نعم | أيقونة قصار السور | قسم السور | ممتاز | يغلب عليها البنفسجي → نسخة ملوّنة بالفيروزي | `public/assets/icons/surahs.webp` |
| `icons/values.png` | 1536×1024 PNG | نعم | أيقونة حديقة القيم | قسم القيم | ممتاز | — | `public/assets/icons/values.webp` |
| `characters/Cheerful Cartoon Friends Group Cutout-3.png` | 1359×1158 PNG | نعم | الأصدقاء الخمسة (مجموعة متراصّة) | احتياطي للمواد التعريفية | جيد | ثعلوب بلا نظارة | `public/assets/illustrations/friends-group.webp` |
| `characters/Cheerful Fennec Fox Character Sheet-3.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Cheerful Fennec Fox with Polka-Dot Scarf-1.png` | 1130×1392 PNG | نعم | ثعلوب دون نظارة | غير مستخدم | لا يطابق الوصف الرسمي (بلا نظارة) | — | — |
| `characters/Cheerful Floating Robot Zizou-6.png` | 1312×1199 PNG | نعم | زيزو (وضعية بديلة، نجمة على الصدر) | **أيقونة مؤقتة لقسم عالم زيزو** | جيد | تصميم الصدر يختلف عن zizou.png (نجمة/قلب) | `public/assets/characters/zizou-star.webp` |
| `characters/Cheerful Purple Hoopoe Greeting-7.png` | 1272×1237 PNG | نعم | نور بوشاح بنفسجي ومنقار برتقالي | غير مستخدم | يختلف عن noor.png في الوشاح والمنقار | تعارض في تصميم الشخصية | — |
| `characters/Colourful Cartoon Mascot Team-4.png` | 2172×724 PNG | نعم | الأصدقاء الخمسة في صف | التذييل | جيد | ظلال خفيفة شبه شفافة تحت الأقدام (مقبولة) | `public/assets/illustrations/friends-lineup.webp` |
| `characters/Colourful Jamool Friends Character Set-5.png` | 1320×1192 PNG | نعم | الأصدقاء الخمسة متفرقون | غير مستخدم | تصاميم تختلف قليلًا عن المعتمدة | زيزو بنجمة، نور بوشاح بنفسجي | — |
| `characters/Friendly Mascot Adventure Group-2.png` | 1312×1199 PNG | نعم | الأصدقاء الخمسة (شبه مطابق للسابق) | غير مستخدم | مكرر تقريبًا | — | — |
| `characters/Jamool Camel Brand Board-1.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Jamool Camel Character Design Sheet-1.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Jamool Camel Mascot Branding Board-2.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Jamool Friends at the Desert Oasis (1).png` | 1672×941 PNG | قناة موجودة لكنها معيبة | نسخة مكررة بايتيًا من السابق | — | مكرر | مطابق MD5 | — |
| `characters/Jamool Friends at the Desert Oasis.png` | 1672×941 PNG | قناة موجودة لكنها معيبة | مشهد الواحة (لوحة كاملة بخلفية) | غلاف قصة «كنز الواحة» والمغامرة المميزة | جيد بعد التسطيح | **قناة Alpha معيبة: 95% من البكسلات شبه شفافة** → سُطّحت إلى RGB | `public/assets/illustrations/oasis-scene.webp` |
| `characters/Jamool the Backpack Camel Model Sheet.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Jamool the Cheerful Camel Character Sheet-2.png` | 1672×941 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Noor the Cheerful Hoopoe Character Sheet-1.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Noor the Cheerful Hoopoe Character Sheet.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Noor the Hoopoe Character Sheet-3.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Thaloub the Fennec Fox Character Sheet-1.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Thaloub the Fox Character Sheet-2.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/Zizou Robot Character Sheet.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
| `characters/jamool.png` | 1265×1244 PNG | نعم | جمّول (الوضعية المعتمدة) | Hero، حالات فارغة، القصص، الأصدقاء | ممتاز | هوامش فارغة | `public/assets/characters/jamool.webp` |
| `characters/jamool1.png` | 1277×1231 PNG | نعم | جمّول (نسخة شبه مطابقة) | احتياطي | جيد | شبه مكرر لـ jamool.png | `public/assets/characters/jamool-alt.webp` |
| `characters/maha.png` | 1024×1536 PNG | نعم | مها | الرسم والتلوين | جيد بعد المعالجة | **هالة ضبابية شبه شفافة حول الشخصية (47% من البكسلات بشفافية منخفضة)** → أزيلت بإعادة ضبط مستويات Alpha | `public/assets/characters/maha.webp` |
| `characters/noor.png` | 1200×1310 PNG | نعم | نور (وشاح فيروزي) | قصار السور، حديقة القيم | ممتاز | هوامش فارغة | `public/assets/characters/noor.webp` |
| `characters/thaloob.png` | 1130×1392 PNG | نعم | ثعلوب (بالنظارة — مطابق للوصف) | الألعاب، المسابقات، الإنجازات | ممتاز | هوامش فارغة | `public/assets/characters/thaloob.webp` |
| `characters/zizou.png` | 1147×1371 PNG | نعم | زيزو (قلب على الصدر) | عالم زيزو، حالات الخطأ | ممتاز | هوامش فارغة | `public/assets/characters/zizou.webp` |
| `characters/نور the Friendly Hoopoe Character Sheet-2.png` | 1536×1024 PNG | لا (RGB) | لوحة مرجعية (Character Sheet) بخلفية كريمية ونصوص | مرجع للمصممين فقط | لا تُعرض في الموقع | خلفية غير شفافة، عدة وضعيات في صورة واحدة | — |
