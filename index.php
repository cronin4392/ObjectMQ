
<?php include 'partials/_head.php'; ?>
<div class="nav">
	<div class="logo">Site</div>
	<ul class="nav-items">
		<?php for($i=0; $i<5; $i++): ?>
		<li class="nav-item"><a href="#">Weeee</a></li>
		<?php endfor; ?>
	</ul>
</div>
<div class="promo-product">
	<h1>Promo</h1>
	<?php include 'partials/product.php'; ?>
</div>
<div class="featured-products">
	<h1>Feature</h1>
	<div class="wrapper">
		<?php for($i=0; $i<2; $i++): ?>
		<?php include 'partials/product.php'; ?>
		<?php endfor; ?>
	</div>
</div>
<div class="container">
	<div class="filter-container">
		<h2 class="toggle filter-toggle-js"><a href="#">Filter</a></h2>
		<ul class="filters">
			<?php for($i=0; $i<5; $i++): ?>
			<li class="filter">Dresses</li>
			<?php endfor; ?>
		</ul>
	</div>
	<div class="products mq-element-js" data-mq-triggers="260,520,780,1040,1300">
		<div class="products-wrapper">
			<?php for($i=0; $i<25; $i++): ?>
			<?php include 'partials/product.php'; ?>
			<?php endfor; ?>
		</div>
	</div>
</div>

<?php include 'partials/_foot.php'; ?>