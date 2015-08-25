/**
* Scroll Jquery with protoype inh.
* by Hakan Hurriyet <aysanhakan@gmail.com>
*/
(function(window,$){
 "use strict"

 var Scrollme = function(element,options)
 {
   this.element = element;
   this.$element = $(element);
   this.options = options;
   this.metatag = this.$element.data("scrollmes");

 }

 var defaults = {
   classNames: null,
   scrollSpeed: 300,
   activeClass: null
 };

 Scrollme.prototype.init = function()
 {
   this.config = $.extend({},this.defaults,this.options,this.metatag);
   this.scrollmeboy();
   this.onscroll();
   return this;
 }

 Scrollme.prototype.scrollmeboy = function()
 {

   var self = this;
   $(self.config.classNames+" a[href^='#']").on('click',function(e) {
     e.preventDefault();
     var hash = this.hash;
     $("html,body").animate({
       scrollTop: $(hash).offset().top
     }, self.config.scrollSpeed,function(){
       //Change the active class
       self.controlTheActivity(hash);
     });
   });

 }

 Scrollme.prototype.getActiveLink = function()
 {
   var self = this;
   var activeIsHere = $(self.config.classNames+"[class *="+self.config.activeClass+"] a" ).attr("href");
   return activeIsHere;
 }

 Scrollme.prototype.controlTheActivity = function(hashes)
 {
   var self = this;

   if(self.getActiveLink() !== hashes )
   {
     $(self.config.classNames).removeClass(self.config.activeClass);
     $(self.config.classNames).has("a[href *="+ hashes +"]").addClass(self.config.activeClass);
   }
   else
   {
     // Do Nothing all is well :)
   }
 }

 Scrollme.prototype.onscroll = function()
 {
   var self = this;

   $(window).scroll(function(e){

     /**
     * $(document).scrollTop() does not work on old browsers
     * but this useage should be work
     */
     var ieScroll = $(e.target).scrollTop();

     $(self.config.classNames + " a").each(function(){

       var links = $(this).attr('href');


         var offset_val = 400;

         if($(links).offset().top <= (ieScroll + offset_val)  )
         {

           self.controlTheActivity(links);
         }



     });

   });
 }




 $.fn.scrollmes = function(options)
 {
   return this.each(function() {
     new Scrollme(this,options).init();
   });
 }




})(window,jQuery);
